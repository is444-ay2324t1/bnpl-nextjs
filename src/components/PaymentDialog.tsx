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
import { Installment } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Gift, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/Toaster/use-toast";
import { ToastAction } from "./ui/Toaster/Toast";
type PaymentDialogProps = {
  amount: number;
  userId: string;
  installmentId?: string;
  orderId: string;
  onRefresh: () => void;
};

export function PaymentDialog({
  amount,
  userId,
  installmentId,
  orderId,
  onRefresh,
}: PaymentDialogProps) {
  const [installmentDetails, setInstallmentDetails] = useState<Installment[]>(
    []
  );

  const { toast } = useToast();
  const [isFetching, setIsFetching] = useState(false);

  const fetchInstallmentDetails = async () => {
    setIsFetching(true);

    try {
      // Perform your fetch operation to get order details using orderId or merchantId
      // Replace the following line with your actual fetch request
      const response = await fetch(`/api/order?orderId=${orderId}`);
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.installment - b.installment);

      setInstallmentDetails(sortedData);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isFetching) {
      // Fetch order details when isFetching becomes true
      fetchInstallmentDetails();
    }
  }, [isFetching]);

  const handlePayment = async (userId: string, installmentId: string) => {
    await fetch("/api/installment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, installmentId }),
    }).then((res) => {
      if (res.status == 200) {
        toast({
          title: "Success",
          description: "Installment has been paid successfully!",
        });
        onRefresh();
      } else {
        toast({
          title: "WOOOOHOOOOOOOOOO ",
          description: "i think it broke ser",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsFetching(true)}>Pay ${amount}</Button>
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
            <div className="mt-6 px-2 h-64 overflow-y-auto">
              {installmentDetails.map((installment, index) => {
                const date = new Date(installment.dueDate);
                // Define options for formatting
                const options: Intl.DateTimeFormatOptions = {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                };

                // Format the date
                const formattedDate = new Intl.DateTimeFormat(
                  "en-US",
                  options
                ).format(date);

                return (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0">
                    {installment.paidDate !== null ? (
                      <>
                        <span className="flex mt-2 h-4 w-4 translate-y-1 rounded-full bg-green-500" />
                        <div className="space-y-1 ml-2">
                          <p className="text-xl font-semibold leading-none">
                            ${installment.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formattedDate}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="flex mt-2 h-4 w-4 translate-y-1 rounded-full bg-orange-500" />
                        <div className="space-y-1 ml-2">
                          <p className="text-xl font-semibold leading-none">
                            ${installment.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formattedDate}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full"
            onClick={() => handlePayment(userId, installmentId!)}>
            Pay ${amount} Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
