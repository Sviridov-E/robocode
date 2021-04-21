import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import { CodeCard } from "./CodeCard";

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
});

export const SavedPage = () => {
  const [codes, setCodes] = useState([]);

  const { createQr, downloadPNG } = useQrGenerator();
  const rawCodes = useSelector(selectSavedCodes);
  const toFormCodes = useCallback(async () => {
    let code = [];
    for (const [name, value] of Object.entries(rawCodes)) {
      const url = await createQr(value, { margin: 0, scale: 12 });
      code.push({
        name,
        value,
        url,
      });
    }
    setCodes(code);
  }, [setCodes, createQr, rawCodes]);

  useEffect(() => {
    toFormCodes();
  }, [toFormCodes]);

  const classes = useStyles();

  return (
    <Grid className={classes.root} spacing={2} container>
      <Grid container item justify="center">
        <Typography variant="h4">Saved codes</Typography>
      </Grid>
      <Grid container item spacing={2}>
        {codes.map(({ url, name, value }) => (
          <Grid xs={12} md={6} lg={3} item key={name}>
            <CodeCard
              imageUrl={url}
              title={name}
              description={value}
              downloadHandler={(value) => downloadPNG(value, { margin: 1, scale: 12 })}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
