import { Container, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { WelcomePage } from './pages/WelcomePage';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

export const Content = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const isBeenThere = window.localStorage.getItem('isBeenThere');
    if (!isBeenThere) return history.push('/welcome');
  }, [history]);
  return (
    <Container className={classes.root} fixed>
      <Switch>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/">
          <Redirect to="/main" />
        </Route>
      </Switch>
    </Container>
  );
};
