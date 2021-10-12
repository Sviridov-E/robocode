import {
  Button,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import image from "../img/robocode.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
  title: {
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem",
    },
  },
  img: {
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  buttons: {
    marginTop: "20px",
    "& button": {
      minWidth: "120px",
    },
  },
}));

export const WelcomePage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  const tryNowClick = useCallback(() => {
    window.localStorage.setItem("isBeenThere", true);
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      align="center"
      justifyContent="center"
      direction="column"
    >
      <Typography
        color="primary"
        className={classes.title}
        gutterBottom
        variant="h1"
      >
        RoboCode
      </Typography>
      <Grid item>
        <img className={classes.img} alt="robot" src={image} />
      </Grid>
      <Typography gutterBottom variant="h4" element="p">
        Create own QR code!
      </Typography>
      <Typography gutterBottom variant="h6" element="p">
        You can encode anything: text, links, sms, business card.
      </Typography>
      <Grid
        className={classes.buttons}
        item
        container
        spacing={isMobile ? 2 : 8}
        direction={isMobile ? "column" : "row"}
        justifyContent="center"
      >
        <Grid item>
          <Button
            onClick={tryNowClick}
            fullWidth={isMobile}
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/main"
          >
            Try Now!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
