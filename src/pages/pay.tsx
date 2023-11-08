import { Layout } from "@/components/Layout";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {
  type Html5QrcodeError,
  type Html5QrcodeResult,
} from "html5-qrcode/esm/core";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function PayPage() {
  const [totalUsd, setTotalUsd] = useState(0);
  const [merchantId, setMerchantId] = useState("");

  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-blue`}
      >
        <div className="flex flex-col w-3/4 text-center">
          <h2 className="font-semibold text-3xl my-2">Payment Details</h2>
          <Separator />
          <div className="flex flex-col gap-3 p-6 border rounded-xl my-10">
            <div className=" text-2xl font-bold text-start">Order details</div>
            <Separator />
            <div className="text-base flex py-2">
              <div className="flex justify-start w-1/2 ">Order ID</div>
              <div className="flex justify-end w-1/2">1234567</div>
            </div>
            <div className="text-base flex py-2">
              <div className="flex justify-start w-1/2 ">Merchant ID</div>
              <div className="flex justify-end w-1/2">#{merchantId}</div>
            </div>
            <div className="text-base flex py-2">
              <div className="flex justify-start w-1/2">Total Amount</div>
              <div className="flex justify-end w-1/2 ">${totalUsd}</div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
