import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    height: 380,
  },
  media: {
    height: 220,
    backgroundSize: 'contain',
    margin: '5px'
  },
  content: {
    maxHeight: 92,
    overflow: 'hidden'
  }
});

export const CodeCard = ({
    imageUrl,
    title,
    string,
    downloadHandler,
    type,
    openModal,
    editHandler
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardActionArea onClick={openModal}>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title="QR-code"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Type: ${type}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => downloadHandler(string)}>
          Download
        </Button>
        <Button size="small" color="primary" onClick={editHandler}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
/* 
  1. Определяем какой тип кода хотим изменить.
  2. Необходимо разнести данные по соответствующим полям кода
  3. Перенаправляем клиента на страницу для создания кода
  4. Заполняем автоматически все поля и позволяем изменить
*/
CodeCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  string: PropTypes.string,
  type: PropTypes.string,
  downloadHandler: PropTypes.func.isRequired,
  editHandler: PropTypes.func,
  openModal: PropTypes.func
}