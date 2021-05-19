import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  firstColumn: {
    width: "30%",
  },
}));

const fieldNames = {
  firstname: "Firstname",
  lastname: "Lastname",
  org: "Organisation",
  title: "Position",
  tel: "Phone",
  url: "Web",
  email: "E-mail",
  ssid: "SSID",
  password: "Password",
  encryption: "Encryption",
  hidden: "Hidden",
  description: "Description",
};

export const ValuesList = ({ content }) => {
  const classes = useStyles();

  const contentObj =
    typeof content === "object" ? content : { description: content };
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table>
        <TableBody>
          {Object.entries(contentObj).map(([key, value]) => {
            if (!value) return null;
            return (
              <TableRow key={key}>
                <TableCell className={classes.firstColumn} align="right">
                  <Typography color="textSecondary" variant="body1">
                    {fieldNames[key]}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{value}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ValuesList.propTypes = {
    content: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
