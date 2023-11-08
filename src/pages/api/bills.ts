import { NextApiRequest, NextApiResponse } from "next";
import { type Sort } from "mongodb";

import clientPromise from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const {
      query: { userId, paid },
    } = req;

    const client = await clientPromise;
    const db = client.db("test_db");
    const installmentCollection = db.collection("installments");
    const orderCollection = db.collection("orders");
    const completedOrders = await orderCollection.countDocuments({
      status: "paid",
    });
    const activeOrders = await orderCollection.countDocuments({
      status: "in progress",
    });
    console.log(completedOrders, activeOrders);
    const query: { userId: string; paidDate?: any } = {
      userId: userId as string,
    };

    if (paid !== undefined && paid !== "") {
      const isPaid = paid === "true";
      query.paidDate = isPaid ? { $ne: null } : null;
    }

    const sortOptions: Sort = {
      dueDate: 1, // 1 for ascending order, -1 for descending order
    };

    const outstandingInstallments = await installmentCollection
      .find(query)
      .sort(sortOptions)
      .toArray();
    const outstandingOrders = await orderCollection
      .find({ userId: userId as string, status: "in progress" })
      .toArray();
    let orders = {};
    let dueIn15 = 0;
    let dueIn30 = 0;
    let totalDue = 0;
    for (let order of outstandingOrders) {
      const orderId = order._id.toString();
      orders[orderId] = order;
      orders[orderId].amountDue = 0;
      orders[orderId].installments = [];
      orders[orderId].earliestDueDate = null;
    }
    for (let installment of outstandingInstallments) {
      const orderId = installment.orderId.toString();
      orders[orderId].installments.push(installment);
      let amountDue = installment.amount - installment.amountPaid;
      orders[orderId].amountDue += amountDue;
      totalDue += amountDue;
      if (
        installment.dueDate <
        new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000)
      ) {
        dueIn15 += amountDue;
      }
      if (
        installment.dueDate <
        new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
      ) {
        dueIn30 += amountDue;
      }
      if (
        orders[orderId].earliestDueDate == null ||
        installment.dueDate < orders[orderId].earliestDueDate
      ) {
        orders[orderId].earliestDueDate = installment.dueDate;
      }
    }

    console.log(orders);
    res.status(200).json({
      outstandingInstallments,
      orders,
      dueIn15,
      dueIn30,
      totalDue,
      completedOrders,
      activeOrders,
    });
  }
}
