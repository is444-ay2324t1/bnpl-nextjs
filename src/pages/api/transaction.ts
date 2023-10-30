// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import type { NewTransaction, Order, Installment } from "@/types";
import { billPayment } from "@/lib/service";
import clientPromise from "@/lib/db";

function getInstallmentAmounts(amount: number, numberOfInstallments: number) {
  const installmentAmounts: number[] = [];
  const monthlyAmount = Number((amount / numberOfInstallments).toFixed(2));
  for (let i = 0; i < numberOfInstallments; i++) {
    installmentAmounts.push(monthlyAmount);
    amount -= monthlyAmount;
  }
  installmentAmounts[numberOfInstallments - 1] += Number(amount.toFixed(2));
  return installmentAmounts;
}

function addMonths(date: Date, months: number) {
  const dateCopy = new Date(date);
  dateCopy.setMonth(dateCopy.getMonth() + months);
  return dateCopy;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    // Assuming customer acc already has enuf balance for the first txn
    const {
      userId,
      numberOfInstallments,
      transactionAmount,
      category,
      merchant,
    }: NewTransaction = req.body;
    const client = await clientPromise;
    const db = client.db("test_db");
    const user = await db.collection("users").findOne({ userId: userId });

    const installmentAmounts = getInstallmentAmounts(
      transactionAmount,
      numberOfInstallments
    );

    const order: Order = {
      category: category,
      merchant: merchant,
      status: "in progress",
      userId: userId,
    };
    const { insertedId: newOrderId } = await db
      .collection("orders")
      .insertOne(order);

    try {
      const response = await billPayment({
        userID: user?.userId,
        PIN: user?.pin,
        OTP: "999999",
        accountFrom: user?.tbankAccountNumber,
        accountTo: "11157",
        transactionAmount: installmentAmounts[0],
        transactionReferenceNumber: newOrderId.toString(),
        narrative: `Payment for installment 1 of ${numberOfInstallments} for ${merchant} - ${category}`,
      });

      // TODO: Either we: (1) trf the merchant the (full amount - commission) upon new transaction OR (2) we trf the merchant the commission upon each installment.
      // I think (1) makes more sense business wise, cuz BNPL is our service, doesnt make sense for the merchant to take up the risk of customer default? Easier to implement also.
      // Need to do the transferring to merchant account.

      for (let i = 0; i < numberOfInstallments; i++) {
        const newinstallment: Installment = {
          userId: userId,
          orderId: newOrderId,
          installment: i + 1,
          dueDate: addMonths(new Date(), i),
          paidDate: i == 0 ? new Date() : null,
          amount: installmentAmounts[i],
          amountPaid: i == 0 ? installmentAmounts[i] : 0,
        };
        await db.collection("installments").insertOne(newinstallment);
      }
      res.status(200).json(response);
    } catch (err) {
      const e = err as Error;
      res.status(400).json({ error: e.message });
    }
  }
}
