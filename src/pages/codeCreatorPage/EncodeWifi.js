import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState, useCallback } from "react";
import { serializeWifi } from "../../lib/serializers";
import { useSelector } from "react-redux";
import useQuery from "../../reactHooks/useQuery";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import { useLocation } from "react-router";

export const EncodeWifi = ({ setEncodingData }) => {
  const [state, setState] = useState({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });

  const query = useQuery();
  const savedCodes = useSelector(selectSavedCodes)
  const codeName = query.get('code');
  const location = useLocation()

  const fillFieldsFromStore = useCallback(() => {
    setState(state => ({...state, ...savedCodes[codeName].values}));
  }, [setState, savedCodes, codeName])

  useEffect(() => {
    const type = location.pathname.split('/').pop();
    if(!codeName || type !== savedCodes[codeName].type) return;
    fillFieldsFromStore();
  }, [fillFieldsFromStore, codeName, location.pathname, savedCodes])

  const changeDataToEncode = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prevValue) => ({
      ...prevValue,
      [e.target.name]: value,
    }));
  };

  useEffect(() => {
    setEncodingData({
      values: state,
      string: serializeWifi(state)
    }
    );
  }, [state, setEncodingData]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="SSID (Newtwork Name)"
          name="ssid"
          placeholder="My Network"
          variant="outlined"
          value={state.ssid}
          onChange={changeDataToEncode}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={!!state.hidden}
              onChange={changeDataToEncode}
              name="hidden"
            />
          }
          label="SSID Hidden"
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="encode-wifi-select-label">Encryption</InputLabel>
          <Select
            labelId="encode-wifi-select-label"
            value={state.encryption}
            onChange={changeDataToEncode}
            name="encryption"
            label="Encryption"
          >
            <MenuItem value={"WPA"}>WPA/WPA2</MenuItem>
            <MenuItem value={"WEP"}>WEP</MenuItem>
            <MenuItem value={"blank"}>None</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          placeholder="My Network"
          variant="outlined"
          value={state.password}
          onChange={changeDataToEncode}
        />
      </Grid>
    </Grid>
  );
};
