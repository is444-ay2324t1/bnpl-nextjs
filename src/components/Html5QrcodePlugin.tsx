// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/html5-qrcode-scanner";
import { useEffect, type ComponentPropsWithoutRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

export type Html5QrcodePluginProps = ComponentPropsWithoutRef<"div"> &
  Html5QrcodeScannerConfig & {
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback: (error: any) => void;
    verbose?: boolean;
  };

const Html5QrcodePlugin = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  qrCodeErrorCallback,
  qrCodeSuccessCallback,
  verbose,
  ...props
}: Html5QrcodePluginProps) => {
  useEffect(() => {
    // when component mounts
    let config: Html5QrcodeScannerConfig = {
      fps: fps ?? 10,
      qrbox: qrbox ?? 600,
      aspectRatio: aspectRatio ?? 1.0,
      disableFlip: disableFlip === true,
    };

    console.log("config", config);
    // Suceess callback is required.
    if (!qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose === true
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div {...props} id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
