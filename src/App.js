import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { useCommonTheme } from './reactHooks/useCommonTheme';
import { ToastContext } from './context/ToastContext';
import { useToast } from './reactHooks/useToast';
import { Toast } from './components/Toast';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Content } from './Content';

function App() {
  const theme = useCommonTheme();


  const toast = useToast();

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContext.Provider value={{ ...toast }}>
            <Content />
            <Toast />
          </ToastContext.Provider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
