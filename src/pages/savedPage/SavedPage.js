import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQrGenerator } from "../../reactHooks/useQrGenerator";
import { selectSavedCodes } from "../../redux/slices/savedCodesSlice";
import { CodeCard } from "./CodeCard";
import { CodeModal } from "./CodeModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}));

export const SavedPage = () => {
  const [codes, setCodes] = useState([]);
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
  const closeModal = () => setModalOpen({isOpen: false, content: {}});

  const { createQr, downloadPNG } = useQrGenerator();
  const rawCodes = useSelector(selectSavedCodes);
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
        {codes.map(({ url, name, string, type, date, values }) => (
          <Grid xs={12} md={6} lg={3} item key={name}>
            <CodeCard
              imageUrl={url}
              title={name}
              description={string}
              type={type}
              date={date}
              values={values}
              openModal={() => openModal({title: name, dataToCode: string, description: values, type, date})}
              downloadHandler={(value) =>
                downloadPNG(value, { margin: 1, scale: 12 })
              }
            />
          </Grid>
        ))}
      </Grid>
      <CodeModal
        open={modalOpen.isOpen}
        title={modalOpen.content.title}
        description={modalOpen.content.description}
        dataToCode={modalOpen.content.dataToCode}
        date={modalOpen.content.date}
        type={modalOpen.content.type}
        onClose={closeModal}
      />
    </Grid>
  );
};
