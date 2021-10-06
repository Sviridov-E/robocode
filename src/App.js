import { Container, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { WelcomePage } from './pages/WelcomePage';
import { useCommonTheme } from './reactHooks/useCommonTheme';
import { MainPage } from './pages/MainPage';
import { ToastContext } from './context/ToastContext';
import { useToast } from './reactHooks/useToast';
import { Toast } from './components/Toast';
import { Provider } from 'react-redux';
import store from './redux/store';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

function App() {
  const classes = useStyles();
  const theme = useCommonTheme();

  const history = useHistory();

  useEffect(() => {
    const isBeenThere = window.localStorage.getItem('isBeenThere');
    if (!isBeenThere) return history.push('/welcome');
  }, [history]);

  const toast = useToast();

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContext.Provider value={{ ...toast }}>
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
            <Toast />
          </ToastContext.Provider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
