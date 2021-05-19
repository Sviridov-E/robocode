import { TextField } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import PropTypes from 'prop-types';

export const EncodeText = ({ setEncodingData }) => {
  const [state, setState] = useState("");

  const query = useQuery();
  const savedCodes = useSelector(selectSavedCodes)
  const codeName = query.get('code');

  const fillFieldsFromStore = useCallback(() => {
    setState(savedCodes[codeName].values);
  }, [setState, savedCodes, codeName])

  useEffect(() => {
    const type = 'text';
    if(!codeName || type !== savedCodes[codeName].type) return;
    fillFieldsFromStore();
  }, [fillFieldsFromStore, codeName, savedCodes])
  
  const changeDataToEncode = (e) => {
    const value = e.target.value;
    setState(value);
    setEncodingData({string: value, values: value});
  };

  return (
    <>
      <TextField
        multiline
        label="Text to encode"
        placeholder="Write some text!"
        variant="outlined"
        fullWidth
        value={state}
        onChange={changeDataToEncode}
      />
    </>
  );
};

EncodeText.propTypes = {
  setEncodingData: PropTypes.func
}