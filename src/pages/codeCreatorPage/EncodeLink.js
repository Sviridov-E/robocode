import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { serializeLink } from "../../lib/serializers";

export const EncodeLink = ({ setEncodingData }) => {
  const [state, setState] = useState("");

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
