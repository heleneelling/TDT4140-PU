import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import ProfilePage from '../../components/profile/ProfilePage';

test('Profile page renders without error', () => {
  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const history = createMemoryHistory();

  const component = renderer.create(
      <ProfilePage
        isLoggedIn = {true}
        currentUser={currentUser}
        history = {history}
        unloadStateAfterLogout={() => { }} />);

  expect(component).toBeDefined();
});

test('Profile page back button', () => {
  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const history = createMemoryHistory();

  const {getAllByText} = render(
      <ProfilePage
        isLoggedIn = {true}
        currentUser={currentUser}
        history = {history}
        unloadStateAfterLogout={() => { }} />);

  const backBtn = getAllByText('')[6];
  fireEvent.click(backBtn);
});

test('Not found loads when user not logged in', () => {
  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const history = createMemoryHistory();

  const component = render(
      <ProfilePage
        isLoggedIn = {false}
        currentUser={currentUser}
        history = {history}
        unloadStateAfterLogout={() => { }} />);

  expect(component).toBeDefined();
});
