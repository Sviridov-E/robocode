import {
  makeStyles,
  Modal,
  Fade,
  Paper,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { ValuesList } from "./ValuesList";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeCode as removeCodeAction } from "../../redux/slices/savedCodesSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalPaper: {
    outline: "none",
    overflow: "auto",
    maxHeight: "95vh",
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    textAlign: "center",
  },
  divider: {
    margin: "10px 0",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
  },
  image: {
    display: "block",
    maxHeight: "40vh",
    objectFit: "contain",
  },
  subtitles: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: '5px'
  }
}));

export const CodeModal = ({
  dataToCode,
  title,
  description,
  onClose,
  open,
  date,
  type,
}) => {
  const [codeUrl, setCodeUrl] = useState("");

  const classes = useStyles();

  const { createQr } = useQrGenerator();

  const dispatch = useDispatch();

  const createCode = useCallback(async () => {
    const url = await createQr(dataToCode, { margin: 0, scale: 18 });
    setCodeUrl(url);
  }, [dataToCode, createQr, setCodeUrl]);

  const removeCode = useCallback(() => {
    dispatch(removeCodeAction({name: title}));
    onClose();
  }, [dispatch, title, onClose]);

  useEffect(() => {
    createCode();
  }, [createCode]);

  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.modalPaper}>
          <Typography className={classes.title} variant="h3">
            {title}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justify="center">
            <img className={classes.image} alt="qr code" src={codeUrl} />
          </Grid>
          <div className={classes.subtitles}>
            <Typography variant="subtitle2">{`Type: ${type}`}</Typography>
            <Typography variant="subtitle2">{date}</Typography>
          </div>
          <Divider className={classes.divider} />
          <ValuesList content={description} />
          <Grid className={classes.buttonContainer} container justify="flex-end" spacing={3}>
            <Grid item>
              <Button onClick={removeCode} color="secondary">
                Remove
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

CodeModal.propTypes = {
  dataToCode: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  date: PropTypes.string,
  type: PropTypes.string,
};
