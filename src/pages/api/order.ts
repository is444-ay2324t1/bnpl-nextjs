import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId, type Sort } from "mongodb";

import clientPromise from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const {
      query: { orderId },
    } = req;

    const client = await clientPromise;
    const db = client.db("test_db");
    const collection = db.collection("installments");

    const query = { orderId: new ObjectId(orderId as string) };

    const sortOptions: Sort = {
      dueDate: 1,
    };

    const result = await collection.find(query).sort(sortOptions).toArray();
    res.status(200).json(result);
  }
}
