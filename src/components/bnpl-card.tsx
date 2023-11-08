import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/Toaster/Toast";
import { toast } from "@/components/ui/Toaster/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/router";
import { longDateTime } from "@/utils/functions";

type BNPLCardProps = {
  totalUsd: number;
  merchantId: string;
  merchantName: string;
};

export function BNPLCard({
  merchantId,
  totalUsd,
  merchantName,
}: BNPLCardProps) {
  const [planDuration, setPlanDuration] = useState(3);
  const threeMonthPayment = (totalUsd / 3).toFixed(2);
  const sixMonthPayment = (totalUsd / 6).toFixed(2);
  const twelveMonthPayment = (totalUsd / 12).toFixed(2);
  const router = useRouter();

  const handlePayment = async () => {
    const requestBody = {
      userId: "zihang23",
      numberOfInstallments: planDuration,
      transactionAmount: totalUsd,
      merchant: merchantName,
      merchantAccountNumber: merchantId,
    };
    try {
      console.log(JSON.stringify(requestBody));
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.log("HELP");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast({
        title: "Order placed!",
        description: longDateTime.format(new Date()),
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      console.log(data);
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error placing order!",
        description: longDateTime.format(new Date()),
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      console.error("There was a problem making the order:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-start">
          Choose your plan
        </CardTitle>
        <CardDescription className="flex justify-start">
          Select your preferred repayment plan!
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          defaultValue="3-months"
          onValueChange={(value) => {
            const duration =
              value === "3-months" ? 3 : value === "6-months" ? 6 : 12;
            setPlanDuration(duration);
          }}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <RadioGroupItem
              value="3-months"
              id="3-months"
              className="peer sr-only"
            />
            <Label
              htmlFor="3-months"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <div className="text-lg font-medium ">
                    <span className="font-bold">${threeMonthPayment}</span> /
                    month
                  </div>
                  <div className="ml-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-2">
                    Interest free
                  </div>
                </div>
                <div>3 months</div>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="6-months"
              id="6-months"
              className="peer sr-only"
            />
            <Label
              htmlFor="6-months"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <div className="text-lg font-medium">
                    <span className="font-bold">${sixMonthPayment}</span> /
                    month
                  </div>
                  <div className="ml-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-2">
                    Interest free
                  </div>
                </div>
                <div>6 months</div>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="12-months"
              id="12-months"
              className="peer sr-only"
            />
            <Label
              htmlFor="12-months"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <div className="text-lg font-medium">
                    <span className="font-bold">${twelveMonthPayment}</span> /
                    month
                  </div>
                  <div className="ml-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full px-2">
                    Interest free
                  </div>
                </div>
                <div>12 months</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePayment}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
