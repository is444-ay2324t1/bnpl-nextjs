import { formatNumber } from "./../utils/functions";
import { typeAppProps } from "next/app";
import { ObjectId } from "mongodb";

declare interface SidebarItemType {
  title: string;
  href: string;
  icon: React.ReactElement;
}

declare type Asset = {
  ticker: string;
  name: string;
  logoUrl: string;
  balance: number;
  price: number;
  price24hDeltaPercentage: number;
  value: number;
};

declare type NewTransaction = {
  userId: string;
  numberOfInstallments: number;
  transactionAmount: number;
  merchant: string;
  merchantAccountNumber: string;
};

declare type User = {
  userId: string;
  pin: string;
  tbankAccountNumber: string;
  email: string;
  password: string;
  billingAddress: string;
};

declare type Order = {
  id?: ObjectId;
  merchant: string;
  status: string; // possible values: "in progress","paid"
  userId: string;
};

declare type Installment = {
  _id?: ObjectId;
  userId: string;
  orderId: ObjectId;
  installment: number;
  dueDate: string;
  paidDate: string | null;
  amount: number;
  amountPaid: number;
};
