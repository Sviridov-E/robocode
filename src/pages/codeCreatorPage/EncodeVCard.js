import { Grid, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { serializeVCard } from "../../lib/serializers";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import PropTypes from 'prop-types';

export const EncodeVCard = ({ setEncodingData }) => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    org: "",
    title: "",
    tel: "",
    url: "",
    email: "",
  });

  const query = useQuery();
  const location = useLocation();
  const savedCodes = useSelector(selectSavedCodes)
  const codeName = query.get('code');

  const fillFieldsFromStore = useCallback(() => {
    setState(state => ({...state, ...savedCodes[codeName].values}));
  }, [setState, savedCodes, codeName])

  useEffect(() => {
    
    const type = location.pathname.split('/').pop();
    if(!codeName || type !== savedCodes[codeName].type) return;
    fillFieldsFromStore();
  }, [fillFieldsFromStore, codeName, location.pathname, savedCodes])

  const changeDataToEncode = (e) => {
    const value = e.target.value;
    setState((prevValue) => ({
      ...prevValue,
      [e.target.name]: value,
    }));
  };

  useEffect(() => {
    setEncodingData({
      values: state,
      string: serializeVCard(state)
    });
  }, [state, setEncodingData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Firstname"
            name="firstname"
            placeholder="John"
            variant="outlined"
            value={state.firstname}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Lastname"
            name="lastname"
            placeholder="Smith"
            variant="outlined"
            value={state.lastname}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Organisation"
            name="org"
            placeholder="Job Inc."
            variant="outlined"
            value={state.org}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            placeholder="Worker"
            variant="outlined"
            value={state.title}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="tel"
            label="Phone"
            name="tel"
            placeholder="+17896541232"
            variant="outlined"
            value={state.tel}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            placeholder="human@example.com"
            variant="outlined"
            value={state.email}
            onChange={changeDataToEncode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="url"
            label="Website"
            name="url"
            placeholder="https://example.com"
            variant="outlined"
            value={state.url}
            onChange={changeDataToEncode}
          />
        </Grid>
      </Grid>
    </>
  );
};

EncodeVCard.propTypes = {
  setEncodingData: PropTypes.func
}