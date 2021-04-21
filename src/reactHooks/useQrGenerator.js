import { useCallback, useMemo, useState } from "react";
import QRCode from "qrcode";

export const useQrGenerator = () => {
  const [base, setBase] = useState({
    raw: null,
    png: null,
  });

  const [defaultOptions] = useState({
    errorCorrectionLevel: "H",
    margin: 2,
    scale: 12,
  });

  const qr = useMemo(
    () => (!base.png ? null : <img alt="qr code" src={base.png} />),
    [base]
  );

  const createQr = useCallback(
    async (str, options) => {
      if (!str) return;
      const png = await QRCode.toDataURL(str, options || defaultOptions);
      setBase((base) => ({ ...base, raw: str, png }));
      return png;
    },
    [setBase, defaultOptions]
  );
  
  const saveImage = useCallback(({blob, type}) => {
    if(!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robocode." + type;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const saveSVG = useCallback(
    async () => {
      if (!base.raw) return;
      const svg = await QRCode.toString(base.raw, defaultOptions);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      saveImage({blob, type: 'svg'});
    },
    [base, defaultOptions, saveImage]
  );
  
  const savePNG = useCallback(() => {
    if(!base.png) return;
    const a = document.createElement("a");
    a.href = base.png;
    a.download = "robocode.png";
    a.click();

  }, [base]);

  const saveJPG = useCallback(async () => {
    const canvas = await QRCode.toCanvas(base.raw, defaultOptions);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    saveImage({blob, type: 'jpg'});
  }, [base, defaultOptions, saveImage]);

  const saveWEBP = useCallback(async () => {
    const canvas = await QRCode.toCanvas(base.raw, defaultOptions);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp'));
    saveImage({blob, type: 'webp'});
  }, [base, defaultOptions, saveImage]);

  return { createQr, qr, saveSVG, savePNG, saveJPG, saveWEBP, saveImage, encodedContent: base.raw };
};
