import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DashboardHeader } from "./DashboardHeader";

type DueProps = {
  amount: number;
  days: number;
};

const DueAmount: React.FC<DueProps> = ({ amount, days }) => {
  return (
    <div className="w-full p-4 border rounded-xl flex flex-col items-center text-center">
      <h2 className="text-xl font-bold">${amount.toFixed(2)}</h2>
      <p className="text-sm">Due in {days} Days</p>
    </div>
  );
};

const OrderDashboard: React.FC = () => {
  return (
    <Card className="w-full">
      <div className="px-6 mt-4">
        <DashboardHeader />
      </div>
      <CardContent className="mt-4">
        <div className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <div>
            <div className="text-base flex flex-row">
              <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="inline-flex items-center rounded-full border font-semibold text-2xl bg-primary text-white px-4 py-4">
                  20
                </div>
                <div className="font-medium p-4">Active</div>
              </div>
              <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="inline-flex items-center rounded-full border font-semibold text-2xl bg-primary text-white px-4 py-4">
                  50
                </div>
                <div className="font-medium p-4">Finished</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-x-2">
        <DueAmount amount={300} days={15} />
        <DueAmount amount={500} days={30} />
      </CardFooter>
    </Card>
  );
};

export default OrderDashboard;
