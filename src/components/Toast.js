import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import React, { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Toast = () => {

  const { state, closeToast } = useContext(ToastContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeToast();
  };

  return (
    <Snackbar open={state.open} autoHideDuration={state.timeout} onClose={handleClose}>
      <Alert onClose={handleClose} severity={state.type}>
        {state.content}
      </Alert>
    </Snackbar>
  );
};
