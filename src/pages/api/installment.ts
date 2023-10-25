// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { NewTransaction, Order, Payment } from "../../types/index";
import clientPromise from "../../lib/db";
import { billPayment } from "../../lib/service";

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
        narrative: `Payment 1 of ${numberOfInstallments} for ${merchant} - ${category} ${transactionAmount}`,
      });

      let firstTransactionId = "";
      for (let i = 0; i < numberOfInstallments; i++) {
        const newPayment: Payment = {
          amount: installmentAmounts[i],
          amountPaid: i == 0 ? installmentAmounts[i] : 0,
          dueDate: addMonths(new Date(), i),
          orderId: newOrderId,
          userId: userId,
        };
        const { insertedId } = await db
          .collection("payments")
          .insertOne(newPayment);
        firstTransactionId = insertedId.toString();
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
