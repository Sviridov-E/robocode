import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncodeWifi } from '../pages/codeCreatorPage/EncodeWifi';
import { renderWithContext } from './renderWithContext';

const setEncodingData = jest.fn();
let encodingData = {};

it('EncodeWifi component', () => {
  window.localStorage.setItem('isBeenThere', true);

  setEncodingData.mockImplementation((arg) => {
    encodingData = arg;
  });

  const { container } = renderWithContext(<EncodeWifi setEncodingData={setEncodingData} />, {
    router: {
      route: '/main/wifi',
    },
  });
  const networkName = screen.getByRole('textbox');
  const networkIsHidden = screen.getByRole('checkbox');
  const password = screen.getByPlaceholderText('My Pass');
  const listboxField = document.getElementById('mui-component-select-encryption');

  expect(networkName).toBeInTheDocument();
  expect(networkIsHidden).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(listboxField).toBeInTheDocument();

  userEvent.type(networkName, 'My network');
  let expected = {
    values: {
      ssid: 'My network',
      password: '',
      encryption: 'WPA',
      hidden: false,
    },
    string: 'WIFI:S:My network;T:WPA;P:;H:false;',
  };
  expect(encodingData).toEqual(expected);

  userEvent.click(networkIsHidden);
  userEvent.type(password, 'MyPass123');
  muiSelect(listboxField, 'WEP');
  expected = {
    values: {
      ssid: 'My network',
      password: 'MyPass123',
      encryption: 'WEP',
      hidden: true,
    },
    string: 'WIFI:S:My network;T:WEP;P:MyPass123;H:true;',
  };
  expect(encodingData).toEqual(expected);
});

function muiSelect(selectElement, optionText) {
  userEvent.click(selectElement);
  let opt = screen.getByText(optionText);
  userEvent.click(opt);
}
