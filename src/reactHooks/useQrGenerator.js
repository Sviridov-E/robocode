import { useCallback, useEffect, useMemo, useState } from "react";
import parser from "html-react-parser";
import QRCode from "qrcode";

export const useQrGenerator = () => {
  const [base, setBase] = useState({
    raw: null,
    png: null,
  });

  const [options, setOptions] = useState({
    errorCorrectionLevel: "H",
    margin: 1,
    scale: 6,
  });

  const qr = useMemo(
    () => (!base.png ? null : <img alt="qr code" src={base.png} />),
    [base]
  );

  const createQr = useCallback(
    async (str) => {
      if (!str) return;
      const png = await QRCode.toDataURL(str, options);
      console.log(str)
      setBase((base) => ({ ...base, raw: str, png }));
    },
    [setBase, options]
  );
  
  const saveImage = useCallback(({blob, type}) => {
    if(!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robocode." + type;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [])

  const saveSVG = useCallback(
    async () => {
      if (!base.raw) return;
      const svg = await QRCode.toString(base.raw, options);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      saveImage({blob, type: 'svg'});
    },
    [base, options, saveImage]
  );
  
  const savePNG = useCallback(() => {
    if(!base.png) return;
    const a = document.createElement("a");
    a.href = base.png;
    a.download = "robocode.png";
    a.click();

  }, [base]);

  const saveJPG = useCallback(async () => {
    const canvas = await QRCode.toCanvas(base.raw, options);
    console.log(canvas);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    saveImage({blob, type: 'jpg'});
  }, [base, options, saveImage])

  const saveWEBP = useCallback(async () => {
    const canvas = await QRCode.toCanvas(base.raw, options);
    console.log(canvas);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp'));
    saveImage({blob, type: 'webp'});
  }, [base, options, saveImage])

  return { createQr, qr, saveSVG, savePNG, saveJPG, saveWEBP, encodedContent: base.raw };
};
