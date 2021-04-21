import { useState, useEffect, useCallback } from "react";

export const useUserData = () => {
  const [savedCodes, setSavedCodes] = useState({});

  const codeKeyName = "savedCodes";
  // Get data from localStorage
  useEffect(() => {
    const codes = JSON.parse(window.localStorage.getItem(codeKeyName));
    setSavedCodes(codes);
  }, [setSavedCodes]);

  // Update localStorage when saved codes is changing
  useEffect(() => {
    window.localStorage.setItem(codeKeyName, JSON.stringify(savedCodes));
  }, [savedCodes]);

  const saveCode = useCallback(
    (content, name = "My code " + (1 + Object.keys(savedCodes).length)) => {
      setSavedCodes((codes) => ({ ...codes, [name]: content }));
    },
    [savedCodes]
  );

  const removeCode = useCallback((name) => {
    setSavedCodes((codes) => {
      return Object.entries(codes).reduce((prev, [key, value]) => {
        if (key === name) return prev;
        return { ...prev, [key]: value };
      }, {});
    });
  }, []);

  const getCodes = useCallback(() => {
    return JSON.parse(window.localStorage.getItem(codeKeyName));
  }, []);

  return { saveCode, removeCode, getCodes };
};
