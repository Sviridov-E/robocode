import {
  AppBar,
  Box,
  Paper,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  Grid,
} from "@material-ui/core";
import { CodeCreatorPage } from "./codeCreatorPage/CodeCreatorPage";
import { grey } from "@material-ui/core/colors";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";
import { SavedPage } from "./savedPage/SavedPage";
import { LoginPage } from "./LoginPage";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    color: grey[50],
  },
  button: {
    marginRight: "40px",
    color: grey[50],
  },
  buttonMobile: {
    marginRight: "10px",
    color: grey[50],
  },
  content: {
    marginTop: "100px",
  },
  paper: {
    width: "100%",
    minHeight: "80vh",
  },
});

export const MainPage = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { path, url } = useRouteMatch();

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h5">
            RoboCode
          </Typography>
            <Box>
              <Button className={isMobile ? classes.buttonMobile : classes.button} component={Link} to={`${url}`}>Creator</Button>
              <Button className={isMobile ? classes.buttonMobile : classes.button} component={Link} to={`${url}/saved`}>Saved</Button>
            </Box>
        </Toolbar>
      </AppBar>
      <Grid className={classes.content} container justify="center">
        <Grid item container xs={12} md={9}>
          <Paper elevation={3} className={classes.paper}>
            <Switch>
              <Route path={`${path}/saved`}>
                <SavedPage />
              </Route>
              <Route path={`${path}/login`}>
                <LoginPage />
              </Route>
              <Route path={path}>
                <CodeCreatorPage />
              </Route>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
