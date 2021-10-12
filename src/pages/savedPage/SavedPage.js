import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import { CodeCard } from "./CodeCard";
import { CodeModal } from "./CodeModal";
import { DeleteCodesDialog } from "./DeleteCodesDialog";
import { removeAllCodes as removeAllCodesAction } from "../../redux/slices/savedCodesSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10px 70px",
    position: "relative",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  removeBtn: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

export const SavedPage = () => {
  /* ************************************************************** */
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    content: {}, // type, dataToCode, title, description
  });
  const openModal = (content) => {
    setModalOpen((state) => ({
      content: content || state.content,
      isOpen: true,
    }));
  };
  const closeModal = () => setModalOpen({ isOpen: false, content: {} });
  /* ************************************************************** */

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

  /* ************************************************************** */
  const history = useHistory();
  const editHandler = useCallback(
    (type, name) => {
      type = type === "text" ? "" : "/" + type;
      history.push(`/main${type}?code=${name}`);
    },
    [history]
  );
  /* ************************************************************** */

  /* ************************************************************** */
  const [codes, setCodes] = useState([]);
  const { createQr, downloadPNG } = useQrGenerator();
  const rawCodes = useSelector(selectSavedCodes);
  const dispatch = useDispatch();
  const toFormCodes = useCallback(async () => {
    let code = [];
    for (const [name, value] of Object.entries(rawCodes)) {
      const url = await createQr(value.string, { margin: 0, scale: 12 });
      code.push({
        name,
        string: value.string,
        date: value.date,
        values: value.values,
        type: value.type,
        url,
      });
    }
    setCodes(code);
  }, [setCodes, createQr, rawCodes]);

  const removeAllCodes = useCallback(() => {
    dispatch(removeAllCodesAction());
  }, [dispatch]);

  useEffect(() => {
    toFormCodes();
  }, [toFormCodes]);
  /* ************************************************************** */

  const classes = useStyles();

  return (
    <Grid className={classes.root} spacing={2} container>
      <Grid container item justifyContent="center">
        <Typography variant="h4" color="primary">
          Saved codes
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        {codes.map(({ url, name, string, type, date, values }) => (
          <Grid xs={12} md={6} lg={3} item key={name}>
            <CodeCard
              imageUrl={url}
              title={name}
              string={string}
              type={type}
              date={date}
              values={values}
              openModal={() =>
                openModal({
                  title: name,
                  dataToCode: string,
                  description: values,
                  type,
                  date,
                })
              }
              editHandler={() => editHandler(type, name)}
              downloadHandler={(value) =>
                downloadPNG(value, { margin: 1, scale: 12 })
              }
            />
          </Grid>
        ))}
      </Grid>
      {!!codes.length && (
        <Button
          className={classes.removeBtn}
          onClick={() => setDeleteDialogIsOpen(true)}
          variant="contained"
        >
          Remove all
        </Button>
      )}
      <CodeModal
        open={modalOpen.isOpen}
        title={modalOpen.content.title}
        description={modalOpen.content.description}
        dataToCode={modalOpen.content.dataToCode}
        date={modalOpen.content.date}
        type={modalOpen.content.type}
        onClose={closeModal}
      />
      <DeleteCodesDialog
        isOpen={deleteDialogIsOpen}
        toCancel={() => setDeleteDialogIsOpen(false)}
        toConfirm={removeAllCodes}
      />
    </Grid>
  );
};
