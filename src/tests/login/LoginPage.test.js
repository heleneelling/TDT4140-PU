import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {LoginPage} from '../../components/login/LoginPage';


test('Loginpage renders without error', () => {
  const component = renderer.create(
      <LoginPage />,
  );

  expect(component).toBeDefined();
});

test('Testing that the register button renders correctly', () => {
  const {getByText} = render(<LoginPage />);

  expect(getByText('Registrer deg')).toBeDefined();
});

test('Testing that clicking the register button changes the location', () => {
  const history = createMemoryHistory();
  expect(history.location.pathname).toBe('/');

  const {getByText} = render(<LoginPage history={history} />);

  const registerButton = getByText('Registrer deg');

  fireEvent.click(registerButton);

  expect(history.location.pathname).toBe('/register');
});
