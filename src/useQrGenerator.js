import { useCallback, useMemo, useState } from "react";
import QRCode from 'qrcode';

export const useQrGenerator = () => {
    const [base, setBase] = useState('');
    const qr = useMemo(() => (
        !base ? null : <img alt="qr code" src={base}/>
    ), [base])
    const createQr = useCallback(async (str) => {
        if(!str) return;
        const opt = {
            errorCorrectionLevel: 'H',
            margin: 1,
            scale: 6
        }
        const s = await QRCode.toDataURL(str, opt);
        setBase(s)
    }, [setBase])

    return {createQr, qr}
}