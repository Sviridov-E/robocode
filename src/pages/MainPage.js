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
import { CodeCreatorPage } from "./CodeCreatorPage";
import { grey } from "@material-ui/core/colors";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";
import { SavedPage } from "./SavedPage";
import { LoginPage } from "./LoginPage";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles({
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
          {!isMobile && (
            <Box>
              <Button className={classes.button} component={Link} to={`${url}/saved`}>Saved</Button>
              <Button className={classes.button} component={Link} to={`${url}/settings`}>Settings</Button>
              <Button className={classes.button} component={Link} to={`${url}/login`}>Log In</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Grid className={classes.content} container justify="center">
        <Grid item container xs={12} md={9}>
          <Paper elevation={3} className={classes.paper}>
            <Switch>
              <Route path={path} exact>
                <CodeCreatorPage />
              </Route>
              <Route path={`${path}/saved`}>
                <SavedPage />
              </Route>
              <Route path={`${path}/login`}>
                <LoginPage />
              </Route>
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
