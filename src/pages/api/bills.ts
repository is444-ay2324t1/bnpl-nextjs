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
    const collection = db.collection("installments");

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

    const result = await collection.find(query).sort(sortOptions).toArray();
    res.status(200).json(result);
  }
}
