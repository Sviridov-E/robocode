import { TextField } from "@material-ui/core";
import React, { useState } from "react";

export const EncodeText = ({ setEncodingData }) => {
  const [state, setState] = useState("");

  const changeDataToEncode = (e) => {
    const value = e.target.value;
    setState(value);
    setEncodingData(value);
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
