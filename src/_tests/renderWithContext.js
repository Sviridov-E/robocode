import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';
import { useToast } from '../reactHooks/useToast';
import store from '../redux/store';

export const renderWithContext = (
  component,
  { router: { route = '/' } = {}, theme = createTheme() } = {}
) => {
  let history;
  const Wrapper = ({ children }) => {
    const toast = useToast();

    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ThemeProvider theme={theme}>
            <ToastContext.Provider value={toast}>
              {children}
              <Route
                path="*"
                render={(props) => {
                  history = props.history;
                  return null;
                }}
              />
            </ToastContext.Provider>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  };
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
    store
  };
};
