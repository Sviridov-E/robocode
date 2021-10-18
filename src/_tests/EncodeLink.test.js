import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncodeLink } from '../pages/codeCreatorPage/EncodeLink';
import { renderWithContext } from './renderWithContext';

const setEncodingData = jest.fn();

it('EncodeLink component', () => {
  window.localStorage.setItem('isBeenThere', true);

  const LINK = 'mylink.com';
  const FULL_LINK = 'http://mylink.com';

  const { container } = renderWithContext(<EncodeLink setEncodingData={setEncodingData} />, {
    router: {
      route: '/main/link',
    },
  });

  const textbox = screen.getByPlaceholderText('example.com');

  expect(textbox).toBeInTheDocument();

  userEvent.type(textbox, FULL_LINK);
  expect(textbox).toHaveValue(FULL_LINK);
  let resultExpected = { string: FULL_LINK, values: FULL_LINK };
  let resultReceived = setEncodingData.mock.calls[17][0];
  expect(resultReceived).toEqual(resultExpected);

  userEvent.clear(textbox);
  userEvent.type(textbox, LINK);
  resultExpected = { string: `https://${LINK}`, values: LINK };
  resultReceived = setEncodingData.mock.calls[28][0];
  expect(resultReceived).toEqual(resultExpected);
});
