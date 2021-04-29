import {
  makeStyles,
  Modal,
  Fade,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { ValuesList } from "./ValuesList";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalPaper: {
    outline: "none",
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
      display: 'block',
      maxHeight: '40vh',
      objectFit: 'contain'
  },
  subtitles: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

export const CodeModal = ({
  dataToCode,
  title,
  description,
  onClose,
  open,
  date, type
}) => {

  const [codeUrl, setCodeUrl] = useState("");

  const classes = useStyles();

  const { createQr } = useQrGenerator();

  const createCode = useCallback(async () => {
    const url = await createQr(dataToCode, { margin: 0, scale: 18 });
    setCodeUrl(url);
  }, [dataToCode, createQr, setCodeUrl]);

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
            <img className={classes.image} alt= "qr code" src={codeUrl} />
            <div className={classes.subtitles}>
                <Typography variant="subtitle2">{`Type: ${type}`}</Typography>
                <Typography variant="subtitle2">{date}</Typography>
            </div>
          <Divider className={classes.divider} />
          <ValuesList content={description} />
        </Paper>
      </Fade>
    </Modal>
  );
};
