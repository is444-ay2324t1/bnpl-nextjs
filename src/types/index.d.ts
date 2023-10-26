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
  category: string;
  merchant: string;
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
  category: string;
  merchant: string;
  status: string; // possible values: "in progress","paid"
  userId: string;
};

declare type Payment = {
  id?: ObjectId;
  amount: number;
  amountPaid: number;
  dueDate: Date;
  orderId: ObjectId;
  userId: string;
};
