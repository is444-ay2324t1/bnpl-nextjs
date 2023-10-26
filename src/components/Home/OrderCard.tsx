import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const amount = 300;
const OrderCard = () => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center py-4 ">
        <div className="flex items-center gap-4">
          <Gift />
          <div className="">
            <div className="text-lg font-medium"> Order #1234</div>
            <div className="italic text-gray-700">Due 15 Dec 2023</div>
          </div>
        </div>

        <div className="">
          <Button className="px-4"> Pay ${amount}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { OrderCard };
