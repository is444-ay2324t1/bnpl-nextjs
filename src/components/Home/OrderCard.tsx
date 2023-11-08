import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { PaymentDialog } from "@/components/PaymentDialog";

const amount = 300;
const orderId = "1234";
const merchantId = "Heaopqwemn123";

const OrderCard = () => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center py-4 ">
        <div className="flex items-center gap-4">
          <Gift />
          <div className="">
            <div className="text-lg font-medium"> Order #{orderId}</div>
            <div className="italic text-gray-700">Due 15 Dec 2023</div>
          </div>
        </div>

        <div className="">
          <PaymentDialog
            amount={amount}
            orderId={orderId}
            merchantId={merchantId}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export { OrderCard };
