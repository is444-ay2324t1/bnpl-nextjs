import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Gift, X } from "lucide-react";

const paymentHistory = [
  {
    amount: "$150",
    dueDate: "24 September 2023",
  },
  {
    amount: "$150",
    dueDate: "24 October",
  },
  {
    amount: "$150",
    dueDate: "24 November 2023",
  },
];

type PaymentDialogProps = {
  amount: number;
  orderId: string;
  merchantId: string;
};

export function PaymentDialog({
  amount,
  orderId,
  merchantId,
}: PaymentDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Pay ${amount}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <AlertDialogTitle className="text-xl">
              Payment Details
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-destructive text-white hover:bg-destructive/80 hover:text-white">
              <X />
            </AlertDialogCancel>
          </div>
          <div className="px-4 py-4 border rounded-xl flex items-center">
            {/* <Gift /> */}
            <div className="ml-2 flex flex-col">
              <div className="font-bold text-lg">Order #{orderId}</div>
              <div>Merchant #{orderId}</div>
            </div>
          </div>
          <div className="px-4 py-2 border rounded-xl flex flex-col">
            <div className="font-bold text-lg px-2">Payment History</div>
            <Separator />
            <div className="mt-6 px-2">
              {paymentHistory.map((paymentHistory, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-xl font-semibold leading-none">
                      {paymentHistory.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {paymentHistory.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full">Pay Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
