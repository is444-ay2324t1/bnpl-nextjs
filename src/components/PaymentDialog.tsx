import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Gift, X } from "lucide-react";

const paymentHistory = [
  {
    amount: "$300",
    dueDate: "24 September 2023",
    paid: true,
  },
  {
    amount: "$300",
    dueDate: "24 October 2023",
    paid: true,
  },
  {
    amount: "$300",
    dueDate: "24 November 2023",
    paid: false,
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
            <AlertDialogTitle className="text-xl text-primary">
              Payment Details
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-white text-primary hover:bg-destructive hover:text-white">
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
                  {paymentHistory.paid == true ? (
                    <>
                      <span className="flex mt-2 h-4 w-4 translate-y-1 rounded-full bg-green-500" />
                      <div className="space-y-1 ml-2">
                        <p className="text-xl font-semibold leading-none">
                          {paymentHistory.amount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paymentHistory.dueDate}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex mt-2 h-4 w-4 translate-y-1 rounded-full bg-orange-500" />
                      <div className="space-y-1 ml-2">
                        <p className="text-xl font-semibold leading-none">
                          {paymentHistory.amount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paymentHistory.dueDate}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full">
            Pay ${amount} Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
