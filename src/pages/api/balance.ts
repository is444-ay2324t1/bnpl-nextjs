import clientPromise from "@/lib/db";
import { getDepositAccountBalance } from "@/lib/service";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    const {
      query: { userId },
    } = req;
    const client = await clientPromise;
    const db = client.db("test_db");
    const user = await db.collection("users").findOne({ userId: userId });

    try {
      let response = await getDepositAccountBalance({
        userID: user.userId,
        PIN: user.pin,
        OTP: "999999",
        accountID: user.tbankAccountNumber,
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
