import { TextField } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import { serializePhone } from "../../lib/serializers";
import { useSelector } from "react-redux";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";

export const EncodePhone = ({ setEncodingData }) => {
  const [state, setState] = useState("");

  const query = useQuery();
  const savedCodes = useSelector(selectSavedCodes)
  const codeName = query.get('code');

  const fillFieldsFromStore = useCallback(() => {
    setState(savedCodes[codeName].values);
  }, [setState, savedCodes, codeName])

  useEffect(() => {
    if(!codeName) return;
    fillFieldsFromStore();
  }, [fillFieldsFromStore, codeName])

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
