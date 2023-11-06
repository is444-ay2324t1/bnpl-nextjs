import { Layout } from "@/components/Layout";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {
  type Html5QrcodeError,
  type Html5QrcodeResult,
} from "html5-qrcode/esm/core";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

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
          <div className="flex flex-col gap-3 p-6 border rounded-xl w-3/4 text-center">
            {/* <div className="text-xl">Scan Success!</div>
            <div className="text-base">Scanned Data: {scannedData}</div> */}
            <h2 className="font-semibold text-3xl">Checkout</h2>
            <div className="mt-10 text-2xl font-semi-bold text-start">
              Order details
            </div>
            <Separator />
            <div className="text-lg flex py-2">
              <div className="flex justify-start w-1/2 ">Merchant ID</div>
              <div className="flex justify-end w-1/2">${merchantId}</div>
            </div>
            <div className="text-lg flex py-2">
              <div className="flex justify-start w-1/2">Total Amount</div>
              <div className="flex justify-end w-1/2 ">${totalUsd}</div>
            </div>
            <div className="text-lg items-center py-2 flex">
              <div className="flex justify-start w-2/3">Repayment Plan</div>
              <div className="flex flex-col justify-end w-1/3">
                <Slider defaultValue={[0]} max={12} step={6} />
                <div className="flex justify-between text-start mt-2 text-gray-500">
                  <div>3 </div>
                  <div>6 </div>
                  <div>12 </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-lg text-start">Per Month</div>
          </div>
        ) : (
          <Html5QrcodePlugin
            className="text-base"
            qrCodeSuccessCallback={onScanSuccess}
            qrCodeErrorCallback={onScanFailure}
            {...qrConfig}
          />
        )}
      </main>
    </Layout>
  );
}
