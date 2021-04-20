import { useCallback, useState } from "react";

export const useToast = () => {
  const [state, setState] = useState({
    open: false,
    timeout: 4000,
    content: "",
    type: "success",
  });

  const closeToast = useCallback(() => {
    setState((state) => ({ ...state, open: false }));
  }, [setState]);

  const openToast = useCallback(
    ({ content = "Empty toast", timeout = 4000, type = "success" }) => {
      setState((state) => ({ ...state, timeout, content, type, open: true }));
      return "open toast";
    },
    [setState]
  );

  return { state, closeToast, openToast };
};
