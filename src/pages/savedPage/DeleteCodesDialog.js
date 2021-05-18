import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useCallback } from "react";

export const DeleteCodesDialog = ({ isOpen, toCancel, toConfirm }) => {
  const handleRemove = useCallback(() => {
    toConfirm();
    toCancel();
  }, [toConfirm, toCancel]);
  return (
    <Dialog open={isOpen} onClose={toCancel}>
      <DialogTitle id="alert-dialog-title">
        {"Are you want to remove all saved codes?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All codes will be deleted permanently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRemove} color="secondary" autoFocus>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};
