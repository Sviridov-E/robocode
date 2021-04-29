import { TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serializeLink } from "../../lib/serializers";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";

export const EncodeLink = ({ setEncodingData }) => {
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
      string: serializeLink({link: state}),
      values: state,
    });
  };

  return (
    <>
      <TextField
        label="Link"
        placeholder="example.com"
        variant="outlined"
        fullWidth
        value={state}
        onChange={changeDataToEncode}
      />
    </>
  );
};
