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
    description,
    downloadHandler
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardActionArea>
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
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => downloadHandler(description)}>
          Download
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

CodeCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  downloadHandler: PropTypes.func.isRequired
}