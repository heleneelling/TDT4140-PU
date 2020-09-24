import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import RegisterPage from '../../components/register/RegisterPage';


test('Registerpage renders without error', () => {
  const component = renderer.create(<RegisterPage />);

  expect(component).toBeDefined();
});

test('Testing that the login button renders correctly', () => {
  const {getByText} = render(<RegisterPage />);

  expect(getByText('Logg inn')).toBeDefined();
});

test('Testing that clicking the login button changes the location', () => {
  const history = createMemoryHistory();
  history.location.pathname = '/register';

  const {getByText} = render(<RegisterPage history={history} />);

  const loginButton = getByText('Logg inn');

  fireEvent.click(loginButton);

  expect(history.location.pathname).toBe('/');
});
