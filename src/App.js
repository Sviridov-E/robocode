import { Container, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { WelcomePage } from './pages/WelcomePage';
import { useCommonTheme } from './useCommonTheme';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  }
})

function App() {
  const classes = useStyles();
  const theme = useCommonTheme();

  const history = useHistory();

  useEffect(() => {
    const isBeenThere = window.localStorage.getItem('isBeenThere');
    if(!isBeenThere) history.push('/welcome');
  }, [history])

    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Container className={classes.root} fixed>
            <Switch>
              <Route path="/" exact>
                <MainPage/>
              </Route>
              <Route path="/welcome" exact>
                <WelcomePage/>
              </Route>
              <Route path="/login" exact>
                <LoginPage/>
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </>
    )
}

export default App;
