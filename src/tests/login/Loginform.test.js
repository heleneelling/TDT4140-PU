import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../components/login/Loginform';


test('Loginform renders without error', () => {
  const component = renderer.create(
      <LoginForm/>,
  );

  expect(component).toBeDefined();
});


test('Checking that the input-elements get their value', () => {
  const {getByPlaceholderText} = render(<LoginForm />);
  const emailInput = getByPlaceholderText('E-post');
  const passwordInput = getByPlaceholderText('Passord');

  const expectedEmail = 'test@test.com';
  const expectedPassword = 'password';

  fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
  fireEvent.change(passwordInput, {target: {value: 'password'}});

  expect(emailInput.value).toEqual(expectedEmail);
  expect(passwordInput.value).toEqual(expectedPassword);
});

test('Checking that login error is not visible at start', () => {
  const {getByText} = render(<LoginForm />);

  expect(() => {
    getByText('Feil brukernavn eller passord!');
  }).toThrowError();
});

test('Checking that login error is visible when credentials is wrong', () => {
  let wg = false;
  const getUserWithEmail = (credentials) => {
    wg = true;
    return true;
  };
  const {getAllByText, getByText} = render(<LoginForm wrongCredentials={wg}
    getUserWithEmail={getUserWithEmail} />);

  const loginButton = getAllByText('Logg inn')[1];

  fireEvent.click(loginButton);

  setTimeout(() => {
    expect(getByText('Feil brukernavn eller passord!')).toBeDefined();
  }, 100);
});

test('Checking that clicking the loginbutton works with correct credentials',
    () => {
      const correctUser = {
        email: 'test@test.com',
        password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
        clicked: false,
      };

      let fetchedUser = {};

      const getUserWithEmail = (credentials) => {
        fetchedUser = credentials;
      };
      const {getAllByText, getByPlaceholderText} = render(<LoginForm
        getUserWithEmail={getUserWithEmail} />);

      const emailInput = getByPlaceholderText('E-post');
      const passwordInput = getByPlaceholderText('Passord');

      fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
      fireEvent.change(passwordInput, {target: {value: 'password'}});

      const loginButton = getAllByText('Logg inn')[1];

      fireEvent.click(loginButton);

      expect(fetchedUser).toEqual(correctUser);
    });
