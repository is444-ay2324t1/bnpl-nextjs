import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { PaymentDialog } from "@/components/PaymentDialog";
import { Installment } from "@/types";

const OrderCard = ({
  installmentObj,
  onRefresh,
}: {
  installmentObj: Installment;
  onRefresh: () => void;
}) => {
  const { _id, userId, orderId, amount, dueDate } = installmentObj;
  console.log("ayo", _id);

  const date = new Date(dueDate);
  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <Card>
      <CardContent className="flex justify-between items-center py-4 ">
        <div className="flex items-center gap-4">
          <Gift />
          <div className="">
            <div className="text-lg font-medium">
              Order #{orderId.toString()}
            </div>
            <div className="italic text-gray-700">Due {formattedDate}</div>
          </div>
        </div>

        <div className="">
          {_id && (
            <PaymentDialog
              amount={amount}
              userId={userId}
              installmentId={_id.toString()}
              orderId={orderId.toString()}
              onRefresh={onRefresh}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { OrderCard };
