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
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { DownloadCodeButton } from "./DownloadCodeButton";
import { ToastContext } from "../../context/ToastContext";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router";
import { EncodeText } from "./EncodeText";
import { EncodePhone } from "./EncodePhone";
import { EncodeLink } from "./EncodeLink";
import { EncodeWifi } from "./EncodeWifi";
import { EncodeVCard } from "./EncodeVCard";
import { useDispatch, useSelector } from "react-redux";
import { saveCode as saveCodeAction, selectCodesLength } from "../../redux/slices/savedCodesSlice";

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

  const { path, url } = useRouteMatch();
  const history = useHistory();
  const {pathname} = useLocation();

  const dispatch = useDispatch();
  const codesLength = useSelector(selectCodesLength)

  const [typeOfData, setTypeOfData] = useState(0);
  const handleChangeTypeOfData = (e, val) => setTypeOfData(val);
  useEffect(() => {
    history.push(`${typeOfData ? url + '/' + typeOfData : url}`)
  }, [typeOfData, history, url])

  useEffect(() => {
    const pathArr = pathname.split('/');
    if(pathArr.length <= 2) return;
    const formType = pathArr[pathArr.length-1];
    setTypeOfData(formType);
  }, [pathname]);

  const {
    qr,
    createQr,
    downloadSVG,
    downloadPNG,
    downloadJPG,
    downloadWEBP,
    encodedContent,
  } = useQrGenerator();
  const savers = [downloadPNG, downloadJPG, downloadSVG, downloadWEBP];

  const saveCode = useCallback((values, name = "My code " + (1 + Object.keys(codesLength).length)) => {
    dispatch(saveCodeAction({values, name}))
  }, [codesLength, dispatch])

  const { openToast } = useContext(ToastContext);

  const submitHandler = (e) => {
    e.preventDefault();
    createQr(encodingData);
  };

  const saveClickHandler = () => {
    saveCode(encodedContent)
    openToast({ content: "Code was successfully saved!" });
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
          value={0}
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
          value="phone"
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
          value="link"
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
          value="wifi"
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
          value="card"
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
          <Switch>
            <Route path={path} exact>
              <EncodeText setEncodingData={setEncodingData} />
            </Route>
            <Route path={`${path}/phone`}>
              <EncodePhone setEncodingData={setEncodingData} />
            </Route>
            <Route path={`${path}/link`}>
              <EncodeLink setEncodingData={setEncodingData} />
            </Route>
            <Route path={`${path}/wifi`}>
              <EncodeWifi setEncodingData={setEncodingData} />
            </Route>
            <Route path={`${path}/card`}>
              <EncodeVCard setEncodingData={setEncodingData} />
            </Route>
          </Switch>
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
