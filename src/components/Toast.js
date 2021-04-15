import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import React from "react";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Toast = ({
  type = "success",
  content = "Empty toast",
  timeout = 4000,
  closeHandler,
  open
}) => {

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeHandler();
  };

  return (
    <Snackbar open={open} autoHideDuration={timeout} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {content}
      </Alert>
    </Snackbar>
  );
};
