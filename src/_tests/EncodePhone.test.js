import { act, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncodePhone } from '../pages/codeCreatorPage/EncodePhone';
import { renderWithContext } from './renderWithContext';

const setEncodingData = jest.fn();

it('EncodePhone component', () => {
  window.localStorage.setItem('isBeenThere', true);

  const PHONE = '+79528005452';
  const { container } = renderWithContext(<EncodePhone setEncodingData={setEncodingData} />, {
    router: {
      route: '/main/phone',
    },
  });

  const textbox = screen.getByPlaceholderText('+12345678901');

  expect(textbox).toBeInTheDocument();

  userEvent.type(textbox, PHONE);

  expect(textbox).toHaveValue(PHONE);

  const result = setEncodingData.mock.calls[12][0];
  const expected = {
    string: `tel:${PHONE}`,
    values: PHONE,
  };

  expect(result).toEqual(expected);
});
