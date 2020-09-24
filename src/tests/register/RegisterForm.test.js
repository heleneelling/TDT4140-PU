import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterForm from '../../components/register/RegisterForm';


test('RegisterForm renders without error', () => {
  const component = renderer.create(
      <RegisterForm />,
  );

  expect(component).toBeDefined();
});


test('Checking that the input-elements get their value', () => {
  const {getByPlaceholderText} = render(<RegisterForm />);
  const firstnameInput = getByPlaceholderText('Fornavn');
  const emailInput = getByPlaceholderText('E-post');
  const ageInput = getByPlaceholderText('Alder');
  const phoneInput = getByPlaceholderText('Telefonnr...(eks. 12345678)');
  const passwordInput = getByPlaceholderText('Passord');
  const validatePasswordInput = getByPlaceholderText('Bekreft passord');

  const expectedFirstname = 'Testing';
  const expectedEmail = 'test@test.com';
  const expectedAge = '21';
  const expectedPhone = '12345678';
  const expectedPassword = 'password';
  const expectedValidation = 'password';

  fireEvent.change(firstnameInput, {target: {value: 'Testing'}});
  fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
  fireEvent.change(passwordInput, {target: {value: 'password'}});
  fireEvent.change(validatePasswordInput, {target: {value: 'password'}});
  fireEvent.change(ageInput, {target: {value: 21}});
  fireEvent.change(phoneInput, {target: {value: 12345678}});

  expect(firstnameInput.value).toEqual(expectedFirstname);
  expect(emailInput.value).toEqual(expectedEmail);
  expect(passwordInput.value).toEqual(expectedPassword);
  expect(passwordInput.value).toEqual(expectedValidation);
  expect(ageInput.value).toEqual(expectedAge);
  expect(phoneInput.value).toEqual(expectedPhone);
});

test('Checking that clicking the register button with correct credentials',
    () => {
      let validationBoolean = false;

      const validate = (boolean) => {
        validationBoolean = boolean;
      };

      const {getAllByText, getByPlaceholderText} = render(<RegisterForm
        testingFunc={validate} />);

      const firstnameInput = getByPlaceholderText('Fornavn');
      const emailInput = getByPlaceholderText('E-post');
      const ageInput = getByPlaceholderText('Alder');
      const phoneInput = getByPlaceholderText('Telefonnr...(eks. 12345678)');
      const passwordInput = getByPlaceholderText('Passord');
      const validatePasswordInput = getByPlaceholderText('Bekreft passord');

      fireEvent.change(firstnameInput, {target: {value: 'Testing'}});
      fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
      fireEvent.change(passwordInput, {target: {value: 'password'}});
      fireEvent.change(validatePasswordInput, {target: {value: 'password'}});
      fireEvent.change(ageInput, {target: {value: 21}});
      fireEvent.change(phoneInput, {target: {value: 12345678}});

      const registerButton = getAllByText('Registrer deg')[1];

      fireEvent.click(registerButton);
      expect(validationBoolean).toEqual(true);
    });

test('Checking that clicking the register button fails with wrong password',
    () => {
      let validationBoolean = false;

      const validate = (boolean) => {
        validationBoolean = boolean;
      };

      const {getAllByText, getByPlaceholderText} = render(<RegisterForm
        testingFunc={validate} />);

      const firstnameInput = getByPlaceholderText('Fornavn');
      const emailInput = getByPlaceholderText('E-post');
      const ageInput = getByPlaceholderText('Alder');
      const phoneInput = getByPlaceholderText('Telefonnr...(eks. 12345678)');
      const passwordInput = getByPlaceholderText('Passord');
      const validatePasswordInput = getByPlaceholderText('Bekreft passord'); ;

      fireEvent.change(firstnameInput, {target: {value: 'Testing'}});
      fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
      fireEvent.change(passwordInput, {target: {value: 'password'}});
      fireEvent.change(validatePasswordInput, {
        target: {value: 'wrongvalidation'},
      });
      fireEvent.change(ageInput, {target: {value: 21}});
      fireEvent.change(phoneInput, {target: {value: 12345678}}); ;
      // validation is wrong

      const registerButton = getAllByText('Registrer deg')[1];

      fireEvent.click(registerButton);
      expect(validationBoolean).toEqual(false);
    });

test('Checking that clicking the register button fails with empty firstname',
    () => {
      let validationBoolean = false;

      const validate = (boolean) => {
        validationBoolean = boolean;
      };

      const {getAllByText, getByPlaceholderText} = render(<RegisterForm
        testingFunc={validate} />);

      const firstnameInput = getByPlaceholderText('Fornavn');
      const emailInput = getByPlaceholderText('E-post');
      const ageInput = getByPlaceholderText('Alder');
      const phoneInput = getByPlaceholderText('Telefonnr...(eks. 12345678)');
      const passwordInput = getByPlaceholderText('Passord');
      const validatePasswordInput = getByPlaceholderText('Bekreft passord');

      fireEvent.change(firstnameInput, {target: {value: ''}});
      fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
      fireEvent.change(passwordInput, {target: {value: 'password'}});
      fireEvent.change(validatePasswordInput, {target: {value: 'password'}});
      fireEvent.change(ageInput, {target: {value: 21}});
      fireEvent.change(phoneInput, {target: {value: 12345678}});

      const registerButton = getAllByText('Registrer deg')[1];

      fireEvent.click(registerButton);
      expect(validationBoolean).toEqual(false);
    });

test('Checking that clicking the register button fails with empty email string',
    () => {
      let validationBoolean = false;

      const validate = (boolean) => {
        validationBoolean = boolean;
      };

      const {getAllByText, getByPlaceholderText} = render(<RegisterForm
        testingFunc={validate} />);

      const firstnameInput = getByPlaceholderText('Fornavn');
      const emailInput = getByPlaceholderText('E-post');
      const ageInput = getByPlaceholderText('Alder');
      const phoneInput = getByPlaceholderText('Telefonnr...(eks. 12345678)');
      const passwordInput = getByPlaceholderText('Passord');
      const validatePasswordInput = getByPlaceholderText('Bekreft passord');

      fireEvent.change(firstnameInput, {target: {value: 'Testing'}});
      fireEvent.change(emailInput, {target: {value: ''}});
      fireEvent.change(passwordInput, {target: {value: 'password'}});
      fireEvent.change(validatePasswordInput, {target: {value: 'password'}});
      fireEvent.change(ageInput, {target: {value: 21}});
      fireEvent.change(phoneInput, {target: {value: 12345678}});

      const registerButton = getAllByText('Registrer deg')[1];

      fireEvent.click(registerButton);
      expect(validationBoolean).toEqual(false);
    });
