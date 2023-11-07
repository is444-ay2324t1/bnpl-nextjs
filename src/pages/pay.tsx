import { Layout } from "@/components/Layout";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {
  type Html5QrcodeError,
  type Html5QrcodeResult,
} from "html5-qrcode/esm/core";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
// import { Slider } from "@/components/ui/slider";
import { BNPLCard } from "@/components/bnpl-card";

export default function PayPage() {
  const [isScanSuccess, setIsScanSuccess] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [totalUsd, setTotalUsd] = useState(0);
  const [merchantId, setMerchantId] = useState("");

  const qrConfig = {
    fps: 10,
    qrbox: 600,
    aspectRatio: 1.0,
    disableFlip: false,
  };
  const onScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setScannedData(decodedText);
    setIsScanSuccess(true);
    console.log("isScanSuccess", isScanSuccess);
    console.log("scannedData", scannedData);

    const data = JSON.parse(decodedText);
    setTotalUsd(data.total_usd);
    setMerchantId(data.merchant_id);
  };

  const onScanFailure = (error: Html5QrcodeError) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error: ${error}`);
  };

  return (
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-blue`}
      >
        {/* <Button>Scan Merchant QR</Button> */}
        {isScanSuccess ? (
          <div className="flex flex-col w-3/4 text-center">
            <h2 className="font-semibold text-3xl my-2">Checkout</h2>
            <Separator />
            <div className="flex flex-col gap-3 p-6 border rounded-xl my-10">
              <div className=" text-2xl font-bold text-start">
                Order details
              </div>
              <Separator />
              <div className="text-base flex py-2">
                <div className="flex justify-start w-1/2 ">Order ID</div>
                <div className="flex justify-end w-1/2">1234567</div>
              </div>
              <div className="text-base flex py-2">
                <div className="flex justify-start w-1/2 ">Merchant ID</div>
                <div className="flex justify-end w-1/2">${merchantId}</div>
              </div>
              <div className="text-base flex py-2">
                <div className="flex justify-start w-1/2">Total Amount</div>
                <div className="flex justify-end w-1/2 ">${totalUsd}</div>
              </div>
            </div>
            <BNPLCard totalUsd={totalUsd} />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Html5QrcodePlugin
              className="text-base"
              qrCodeSuccessCallback={onScanSuccess}
              qrCodeErrorCallback={onScanFailure}
              {...qrConfig}
            />
          </div>
        )}
      </main>
    </Layout>
  );
}
