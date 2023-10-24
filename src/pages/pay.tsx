import { Layout } from "@/components/Layout";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import {
  type Html5QrcodeError,
  type Html5QrcodeResult,
} from "html5-qrcode/esm/core";

export default function PayPage() {
  const qrConfig = {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1.0,
    disableFlip: false,
  };
  const onScanSuccess = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  };

  const onScanFailure = (error: Html5QrcodeError) => {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error: ${error}`);
  };

  return (
    <Layout>
      <main
        className={`text-primary flex min-h-screen flex-col items-center justify-between p-10 text-5xl text-blue`}
      >
        {/* <Button>Scan Merchant QR</Button> */}
        <Html5QrcodePlugin
          className="text-base"
          qrCodeSuccessCallback={onScanSuccess}
          qrCodeErrorCallback={onScanFailure}
          {...qrConfig}
        />
      </main>
    </Layout>
  );
}
