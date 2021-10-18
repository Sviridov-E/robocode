import { act, render, screen } from '@testing-library/react';
import { MainPage } from '../pages/MainPage';
import { renderWithContext } from './renderWithContext';
import { Content } from '../Content';
import userEvent from '@testing-library/user-event';
import store from '../redux/store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Test router', () => {
  it('redirecting to welcome page', () => {
    const { history } = renderWithContext(<Content />);
    expect(screen.getByText(/create own qr code/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/welcome');
  });
  it('redirecting to main page', () => {
    window.localStorage.setItem('isBeenThere', true);
    const { history } = renderWithContext(<Content />);
    expect(screen.getByPlaceholderText(/write some text/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/main');
  });
  it('main page routing', async () => {
    window.localStorage.setItem('isBeenThere', true);
    const { history } = renderWithContext(<Content />);
    userEvent.click(screen.getByText(/Phone/i));
    expect(history.location.pathname).toBe('/main/phone');

    userEvent.click(screen.getByText(/Link/i));
    expect(history.location.pathname).toBe('/main/link');

    userEvent.click(screen.getByText(/Wifi/i));
    expect(history.location.pathname).toBe('/main/wifi');

    userEvent.click(screen.getByText(/Card/i));
    expect(history.location.pathname).toBe('/main/card');

    userEvent.click(screen.getByText(/Text/i));
    expect(history.location.pathname).toBe('/main');

    await act(async () => userEvent.click(screen.getByText(/Saved/i)));
    expect(history.location.pathname).toBe('/main/saved');

    userEvent.click(screen.getByText(/Creator/i));
    expect(history.location.pathname).toBe('/main');
  });
});
