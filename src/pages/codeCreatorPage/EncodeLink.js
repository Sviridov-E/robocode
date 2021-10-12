import { TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { serializeLink } from "../../lib/serializers";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import PropTypes from 'prop-types';

export const EncodeLink = ({ setEncodingData }) => {
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
  }, [fillFieldsFromStore, codeName, location.pathname, savedCodes]);


  const changeDataToEncode = useCallback(() => {
    setEncodingData({
      string: serializeLink({link: state}),
      values: state,
    });
  }, [state, setEncodingData])

  useEffect(() => {
    changeDataToEncode()
  }, [changeDataToEncode])

  return (
    <>
      <TextField
        label="Link"
        placeholder="example.com"
        variant="outlined"
        fullWidth
        value={state}
        onChange={({target: {value}}) => setState(value)}
      />
    </>
  );
};

EncodeLink.propTypes = {
  setEncodingData: PropTypes.func
}