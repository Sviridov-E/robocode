import { createContext } from "react";

const noop = () => {};

export const ToastContext = createContext({
    state: {},
    openToast: noop,
    closeToast: noop
});