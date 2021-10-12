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
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { EncodeText } from "./EncodeText";
import { EncodePhone } from "./EncodePhone";
import { EncodeLink } from "./EncodeLink";
import { EncodeWifi } from "./EncodeWifi";
import { EncodeVCard } from "./EncodeVCard";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCode as saveCodeAction,
  selectCodesLength,
  selectSavedCodes,
} from "../../redux/slices/savedCodesSlice";
import { ModalForm } from "./ModalForm";

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
    flexGrow: 1
  },
  qrWrapper: {
    padding: theme.spacing(1),
    minHeight: "150px",
    minWidth: "150px",
  },
  bottomButtons: {
    marginTop: "2rem",
  },
  tab: {
    flexGrow: '1'
  }
}));

export const CodeCreatorPage = () => {
  const classes = useStyles();

  /* ************************************************ */
  const { openToast } = useContext(ToastContext);
  /* ************************************************ */

  const [encodingData, setEncodingData] = useState("");

  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const codesLength = useSelector(selectCodesLength);
  const savedCodes = useSelector(selectSavedCodes);

  const [typeOfData, setTypeOfData] = useState(0);
  const handleChangeTypeOfData = (e, val) => setTypeOfData(val);
  const location = useLocation();
  useEffect(() => {
    history.push(
      `${typeOfData ? url + "/" + typeOfData : url}${location.search}`
    );
  }, [typeOfData, history, url, location.search]);

  useEffect(() => {
    const pathArr = pathname.split("/");
    if (pathArr.length <= 2) return;
    const formType = pathArr[pathArr.length - 1];
    setTypeOfData(formType);
  }, [pathname]);

  const {
    qr,
    createQr,
    downloadSVG,
    downloadPNG,
    downloadJPG,
    downloadWEBP,
    //encodedContent, // String with encoded data when qr code is rendered, even if input will cleared
  } = useQrGenerator();
  const savers = [downloadPNG, downloadJPG, downloadSVG, downloadWEBP];

  const saveCode = useCallback(
    (values, name = "My code " + (1 + codesLength)) => {
      dispatch(saveCodeAction({ values, name }));
    },
    [codesLength, dispatch]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    createQr(encodingData.string);
  };

  const saveClickHandler = () => {
    codeNameFormOpen();
  };

  /* ********Entering name for saving code*********** */
  const [codeNameForm, setCodeNameForm] = useState({
    isOpen: false,
    name: "My code ",
  });
  const codeNameFormClose = () => {
    setCodeNameForm({
      isOpen: false,
      name: "My code ",
    });
  };
  const codeNameFormOpen = () => {
    setCodeNameForm({
      isOpen: true,
      name: "My code " + (1 + codesLength),
    });
  };
  const codeNameFormSubmit = useCallback(() => {
    if (Object.keys(savedCodes).includes(codeNameForm.name)) {
      return openToast({
        content: "This name is already taken!",
        type: "error",
      });
    }
    saveCode(
      {
        ...encodingData,
        type: typeOfData || "text",
        date: new Date().toLocaleDateString(),
      },
      codeNameForm.name
    );
    openToast({ content: "Code was successfully saved!" });
    codeNameFormClose();
  }, [
    savedCodes,
    codeNameForm.name,
    encodingData,
    openToast,
    saveCode,
    typeOfData,
  ]);
  /* ************************************************ */

  return (
    <>
      <Tabs
        value={typeOfData}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTypeOfData}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          value={0}
          className={classes.tab}
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
          className={classes.tab}
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
          className={classes.tab}
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
          className={classes.tab}
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
          className={classes.tab}
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
        <Grid container justifyContent="center">
          <Paper className={classes.qrWrapper} elevation={3}>
            {qr}
          </Paper>
        </Grid>
        <Grid className={classes.bottomButtons} container justifyContent="center">
          <Grid container item xs={8} lg={6} spacing={3}>
            <Grid item container md={6} justifyContent="center">
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
            <Grid item container md={6} justifyContent="center">
              <DownloadCodeButton savers={savers} disabled={!qr} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ModalForm
        title="Name"
        description={"Enter the name of code"}
        onSubmit={codeNameFormSubmit}
        handleClose={codeNameFormClose}
        text={codeNameForm.name}
        setText={(e) =>
          setCodeNameForm((state) => ({ ...state, name: e.target.value }))
        }
        open={codeNameForm.isOpen}
      />
    </>
  );
};
