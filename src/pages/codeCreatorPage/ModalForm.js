import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';

export const ModalForm = ({ title, description, onSubmit, handleClose, open, text, setText }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            onFocus={e => e.target.select()}
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={text}
            onChange={setText}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ModalForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
  setText: PropTypes.func
};
