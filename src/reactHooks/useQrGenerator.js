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
    () => (!base.png ? null : <img alt="qr code" src={base.png} style={{width: '100%', objectFit: 'contain'}}/>),
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

  const downloadImage = useCallback(({ blob, type }) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robocode." + type;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const downloadSVG = useCallback(
    async (raw) => {
      if (!base.raw) return;
      const svg = await QRCode.toString(raw || base.raw, defaultOptions);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      downloadImage({ blob, type: "svg" });
    },
    [base, defaultOptions, downloadImage]
  );

  const downloadPNG = useCallback(
    async (raw, options) => {
      const a = document.createElement("a");
      if (raw) {
        a.href = await createQr(raw, options || defaultOptions);
      } else {
        a.href = base.png;
      }
      a.download = "robocode.png";
      a.click();
    },
    [base, createQr, defaultOptions]
  );

  const downloadJPG = useCallback(
    async (raw) => {
      const canvas = await QRCode.toCanvas(raw || base.raw, defaultOptions);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );
      downloadImage({ blob, type: "jpg" });
    },
    [base, defaultOptions, downloadImage]
  );

  const downloadWEBP = useCallback(
    async (raw) => {
      const canvas = await QRCode.toCanvas(raw || base.raw, defaultOptions);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/webp")
      );
      downloadImage({ blob, type: "webp" });
    },
    [base, defaultOptions, downloadImage]
  );

  return {
    createQr,
    qr,
    downloadSVG,
    downloadPNG,
    downloadJPG,
    downloadWEBP,
    encodedContent: base.raw,
  };
};
