import { act, fireEvent, screen, within } from '@testing-library/react';
import { Content } from '../Content';
import { renderWithContext } from './renderWithContext';
import userEvent from '@testing-library/user-event';

describe('Code creator test', () => {
  window.localStorage.setItem('isBeenThere', true);
  it('correct works with text data', async () => {
    const TEXT_TO_ENCODE = 'I want to encode that';

    const { store } = renderWithContext(<Content />, {
      router: {
        route: '/main',
      },
    });
    const textbox = screen.getByRole('textbox');
    const createBtn = screen.getByText('create');
    const saveBtn = screen.getByText('save');

    // main text field is on the screen
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveAttribute('placeholder', 'Write some text!');

    // text box works
    expect(textbox).toHaveValue('');
    userEvent.type(textbox, TEXT_TO_ENCODE);
    expect(textbox).toHaveValue(TEXT_TO_ENCODE);

    // image creates when btn clicked
    expect(screen.queryByAltText('qr code')).not.toBeInTheDocument();
    expect(createBtn).toBeEnabled();
    userEvent.click(createBtn);
    const qrCode = await screen.findByAltText('qr code');
    expect(qrCode).toBeInTheDocument();

    // correct save in redux store
    expect(store.getState().savedCodes).toEqual({});
    expect(createBtn).toBeEnabled();
    userEvent.click(saveBtn);

    const codeName = 'My new code!';

    const dialogWindow = screen.getByRole('dialog');

    expect(screen.getByText('Enter the name of code')).toBeInTheDocument();
    const nameField = within(dialogWindow).getByRole('textbox');
    fireEvent.change(nameField, {
      target: {
        value: codeName,
      },
    });
    expect(nameField).toHaveValue(codeName);

    userEvent.click(within(dialogWindow).getByText('Save'));

    const expectingValue = {
      [codeName]: {
        string: TEXT_TO_ENCODE,
        values: TEXT_TO_ENCODE,
        type: 'text',
        date: new Date().toLocaleDateString(),
      },
    };

    expect(store.getState().savedCodes).toEqual(expectingValue);
  });
});
