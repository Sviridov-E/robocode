import {
  AppBar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import PhoneIcon from "@material-ui/icons/Phone";
import LinkIcon from "@material-ui/icons/Link";
import WifiIcon from "@material-ui/icons/Wifi";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { grey } from "@material-ui/core/colors";
import React, { useState } from "react";
import { useQrGenerator } from "../useQrGenerator";
import { DataToEncodeForm } from "../components/DataToEncodeForm";
import { DownloadCodeButton } from "../components/DownloadCodeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    color: grey[50],
  },
  button: {
    marginRight: "40px",
    color: grey[50],
  },
  content: {
    marginTop: "100px",
  },
  boxContent: {
    padding: theme.spacing(4),
  },
  paper: {
    width: "100%",
    minHeight: "80vh",
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
    minHeight: '150px',
    minWidth: '150px'
  },
  bottomButtons: {
    marginTop: '2rem'
  }
}));

export const MainPage = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [encodingData, setEncodingData] = useState("");

  const [typeOfData, setTypeOfData] = useState(0);
  const handleChangeTypeOfData = (e, val) => setTypeOfData(val);

  const { qr, createQr, saveSVG, savePNG, saveJPG, saveWEBP } = useQrGenerator();
  const savers = [savePNG, saveJPG, saveSVG, saveWEBP];

  const submitHandler = (e) => {
    e.preventDefault();
    createQr(encodingData);
  };

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h5">
            RoboCode
          </Typography>
          {!isMobile && (
            <Box>
              <Button className={classes.button}>Saved</Button>
              <Button className={classes.button}>Settings</Button>
              <Button className={classes.button}>Log Out</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Grid className={classes.content} container justify="center">
        <Grid item container xs={12} md={9}>
          <Paper elevation={3} className={classes.paper}>
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
                    <Typography
                      className={classes.typographyInTab}
                      variant="button"
                    >
                      Text
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box className={classes.tabBox}>
                    <PhoneIcon />
                    <Typography
                      className={classes.typographyInTab}
                      variant="button"
                    >
                      Phone
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box className={classes.tabBox}>
                    <LinkIcon />
                    <Typography
                      className={classes.typographyInTab}
                      variant="button"
                    >
                      Link
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box className={classes.tabBox}>
                    <WifiIcon />
                    <Typography
                      className={classes.typographyInTab}
                      variant="button"
                    >
                      WiFi
                    </Typography>
                  </Box>
                }
              />
              <Tab
                label={
                  <Box className={classes.tabBox}>
                    <BusinessCenterIcon />
                    <Typography
                      className={classes.typographyInTab}
                      variant="button"
                    >
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
                  <Button variant="contained" color="primary" size="large" type="submit">
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
                  <Grid item container xs justify="center"><Button disabled={!qr} variant="contained" color="primary" style={{width: 160}}>save</Button></Grid>
                  <Grid item container xs justify="center"><DownloadCodeButton savers={savers} disabled={!qr} /></Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
