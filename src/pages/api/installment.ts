import type { NextApiRequest, NextApiResponse } from "next";

import type { Installment } from "@/types";
import { billPayment } from "@/lib/service";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    const { userId, installmentId } = req.body;
    const client = await clientPromise;
    const db = client.db("test_db");
    const user = await db.collection("users").findOne({ userId: userId });
    const installment = await db
      .collection("installments")
      .findOne({ _id: new ObjectId(installmentId) });
    const numberOfInstallments = await db
      .collection("installments")
      .countDocuments({ orderId: new ObjectId(installment?.orderId) });
    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(installment?.orderId) });

    try {
      const response = await billPayment({
        userID: user?.userId,
        PIN: user?.pin,
        OTP: "999999",
        accountFrom: user?.tbankAccountNumber,
        accountTo: "11157",
        transactionAmount: installment?.amount - installment?.amountPaid,
        transactionReferenceNumber: installment?.orderId.toString(),
        narrative: `Payment for installment ${installment?.installment} of ${numberOfInstallments} for ${order?.merchant}`,
      });
      db.collection("installments").updateOne(
        { _id: new ObjectId(installmentId) },
        { $set: { paidDate: new Date(), amountPaid: installment?.amount } }
      );

      // set order status to paid if all installments are paid
      if (installment?.installment == numberOfInstallments) {
        db.collection("orders").updateOne(
          { _id: installment?.orderId },
          { $set: { status: "paid" } }
        );
      }

      res.status(200).json(response);
    } catch (err) {
      const e = err as Error;
      res.status(400).json({ error: e.message });
    }
  }
}
