import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncodeVCard } from '../pages/codeCreatorPage/EncodeVCard';
import { renderWithContext } from './renderWithContext';

const setEncodingData = jest.fn();
let encodingData = {};

it('EncodeVCard component', () => {
  window.localStorage.setItem('isBeenThere', true);

  setEncodingData.mockImplementation((arg) => {
    encodingData = arg;
  });

  const { container } = renderWithContext(<EncodeVCard setEncodingData={setEncodingData} />, {
    router: {
      route: '/main/card',
    },
  });

  const [firstname, lastname, org, title, phone, email, website] = screen.getAllByRole('textbox');

  userEvent.type(firstname, 'Stan');
  userEvent.type(org, 'Corporation');
  userEvent.type(email, 'example@example.com');
  let expected = {
    values: {
      firstname: 'Stan',
      lastname: '',
      org: 'Corporation',
      title: '',
      tel: '',
      url: '',
      email: 'example@example.com',
    },
    string: 'BEGIN:VCARD\nFN:Stan\nORG:Corporation\nEMAIL:example@example.com\nEND:VCARD;',
  };
  expect(encodingData).toEqual(expected);

  userEvent.type(lastname, 'Smith');
  userEvent.type(title, "Engineer");
  userEvent.type(phone, "+79554347898");
  userEvent.type(website, "myownsite.com");
  expected = {
    values: {
      firstname: 'Stan',
      lastname: 'Smith',
      org: 'Corporation',
      title: 'Engineer',
      tel: '+79554347898',
      url: 'myownsite.com',
      email: 'example@example.com',
    },
    string: 'BEGIN:VCARD\nN:Smith;Stan\nORG:Corporation\nTITLE:Engineer\nTEL:+79554347898\nURL:https://myownsite.com\nEMAIL:example@example.com\nEND:VCARD;',
  };
  expect(encodingData).toEqual(expected);
});
