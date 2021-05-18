import { TextField } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import { serializePhone } from "../../lib/serializers";
import { useSelector } from "react-redux";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import { useLocation } from "react-router";

export const EncodePhone = ({ setEncodingData }) => {
  const [state, setState] = useState("");

  const query = useQuery();
  const savedCodes = useSelector(selectSavedCodes)
  const codeName = query.get('code');
  const location = useLocation();

  const fillFieldsFromStore = useCallback(() => {
    setState(savedCodes[codeName].values);
  }, [setState, savedCodes, codeName])

  useEffect(() => {
    const type = location.pathname.split('/').pop();
    if(!codeName || type !== savedCodes[codeName].type) return;
    fillFieldsFromStore();
  }, [fillFieldsFromStore, codeName, location.pathname, savedCodes])

  const changeDataToEncode = (e) => {
    const value = e.target.value;
    setState(value);
    setEncodingData({
      string: serializePhone({tel: state}),
      values: state
    });
  };

  return (
    <>
      <TextField
        autoComplete="off"
        multiline
        label="Phone number"
        placeholder="+12345678901"
        variant="outlined"
        fullWidth
        value={state}
        onChange={changeDataToEncode}
      />
    </>
  );
};
