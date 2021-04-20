import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import PhoneIcon from "@material-ui/icons/Phone";
import LinkIcon from "@material-ui/icons/Link";
import WifiIcon from "@material-ui/icons/Wifi";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import React, { useContext, useState } from "react";
import { useQrGenerator } from "../reactHooks/useQrGenerator";
import { DataToEncodeForm } from "../components/DataToEncodeForm";
import { DownloadCodeButton } from "../components/DownloadCodeButton";
import { useUserData } from "../reactHooks/useUserData";
import { ToastContext } from "../context/ToastContext";

const useStyles = makeStyles((theme) => ({
  boxContent: {
    padding: theme.spacing(4),
  },
  typographyInTab: {
    marginLeft: "8px",
  },
  tabBox: {
    display: "flex",
    alignItems: "center",
  },
  qrWrapper: {
    padding: theme.spacing(1),
    minHeight: "150px",
    minWidth: "150px",
  },
  bottomButtons: {
    marginTop: "2rem",
  },
}));

export const CodeCreatorPage = () => {
  const classes = useStyles();

  const [encodingData, setEncodingData] = useState("");

  const [typeOfData, setTypeOfData] = useState(0);
  const handleChangeTypeOfData = (e, val) => setTypeOfData(val);

  const {
    qr,
    createQr,
    saveSVG,
    savePNG,
    saveJPG,
    saveWEBP,
    encodedContent,
  } = useQrGenerator();
  const savers = [savePNG, saveJPG, saveSVG, saveWEBP];

  const { saveCode } = useUserData();

  const { openToast } = useContext(ToastContext);

  const submitHandler = (e) => {
    e.preventDefault();
    createQr(encodingData);
  };

  const saveClickHandler = () => {
    saveCode(encodedContent);
    openToast({content: 'Code was successfully saved!'})
  };

  return (
    <>
      <Tabs
        value={typeOfData}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTypeOfData}
        centered
      >
        <Tab
          label={
            <Box className={classes.tabBox}>
              <TextFormatIcon />
              <Typography className={classes.typographyInTab} variant="button">
                Text
              </Typography>
            </Box>
          }
        />
        <Tab
          label={
            <Box className={classes.tabBox}>
              <PhoneIcon />
              <Typography className={classes.typographyInTab} variant="button">
                Phone
              </Typography>
            </Box>
          }
        />
        <Tab
          label={
            <Box className={classes.tabBox}>
              <LinkIcon />
              <Typography className={classes.typographyInTab} variant="button">
                Link
              </Typography>
            </Box>
          }
        />
        <Tab
          label={
            <Box className={classes.tabBox}>
              <WifiIcon />
              <Typography className={classes.typographyInTab} variant="button">
                WiFi
              </Typography>
            </Box>
          }
        />
        <Tab
          label={
            <Box className={classes.tabBox}>
              <BusinessCenterIcon />
              <Typography className={classes.typographyInTab} variant="button">
                Card
              </Typography>
            </Box>
          }
        />
      </Tabs>
      <Box className={classes.boxContent}>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <DataToEncodeForm
            type={typeOfData}
            setEncodingData={setEncodingData}
          />
          <Box m={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              create
            </Button>
          </Box>
        </form>
        <Grid container justify="center">
          <Paper className={classes.qrWrapper} elevation={3}>
            {qr}
          </Paper>
        </Grid>
        <Grid className={classes.bottomButtons} container justify="center">
          <Grid container item xs={6}>
            <Grid item container xs justify="center">
              <Button
                onClick={saveClickHandler}
                disabled={!qr}
                variant="contained"
                color="primary"
                style={{ width: 160 }}
              >
                save
              </Button>
            </Grid>
            <Grid item container xs justify="center">
              <DownloadCodeButton savers={savers} disabled={!qr} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
