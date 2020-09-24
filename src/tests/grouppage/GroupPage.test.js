import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {GroupPage} from '../../components/grouppage/GroupPage';

test('Group page renders without error', () => {
  const selectedGroup = {
    'groupid': 41,
    'groupname': 'testgroup1',
    'adminid': 1,
  };

  const members = [
    {
      'userid': 100,
      'username': 'test',
      'email': 'test@test.no',
      'avatar': 'testing',
      'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      'contribution': 0,
    },
    {
      'userid': 101,
      'username': 'test2',
      'email': 'test2@test.no',
      'avatar': 'avatar',
      'password': '8d56ea07e4ac6175807ed5f66279715d394d8885',
      'contribution': 0,
    },
  ];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const component = renderer.create(
      <GroupPage
        selectedGroup={selectedGroup}
        currentUser={currentUser}
        members={members}
        getGroupMembers={() => { }} />);

  expect(component).toBeDefined();
});


test('Testing that the delete button loads correctly and changes path', () => {
  const selectedGroup = {};

  const members = [];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const history = createMemoryHistory();
  history.location.pathname = '/overview/testgroup1';

  const {getByText} = render(<GroupPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    checkIfGroupAdmin={() => {
      return true;
    }}
    history={history}
    getGroupMembers={() => { }} />);

  const groupDeleteButton = getByText('Slett gruppe');
  expect(groupDeleteButton).toBeDefined();
  fireEvent.click(groupDeleteButton);
  expect(history.location.pathname).toBe(`/overview`);
});


test('Testing that the logout button renders and works correctly', () => {
  const selectedGroup = {
    'groupid': 41,
    'groupname': 'testgroup1',
    'adminid': 1,
  };

  const members = [];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const history = createMemoryHistory();
  history.location.pathname = '/overview';

  const {getByText} = render(<GroupPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    checkIfGroupAdmin={() => {
      return true;
    }}
    history={history}
    getGroupMembers={() => { }} />);

  const logoutButton = getByText('Logg ut');
  expect(logoutButton).toBeDefined();

  fireEvent.click(logoutButton);
  expect(history.location.pathname).toBe('/');
});

test('Testing that the profile button is loaded correctly', () => {
  const selectedGroup = {
    'groupid': 41,
    'groupname': 'testgroup1',
    'adminid': 1,
  };

  const members = [];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getByText} = render(<GroupPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    checkIfGroupAdmin={() => {
      return true;
    }}
    history={history}
    getGroupMembers={() => { }}
  />);

  const profileButton = getByText(currentUser.username);
  expect(profileButton).toBeDefined();
});

test('Testing that the member view is loaded correctly', () => {
  const selectedGroup = {
    'groupid': 41,
    'groupname': 'testgroup1',
    'adminid': 1,
  };

  const members = [];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getByText} = render(<GroupPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    checkIfGroupAdmin={() => {
      return true;
    }}
    history={history}
    getGroupMembers={() => { }}
  />);

  const memberView = getByText('Medlemmer:');
  expect(memberView).toBeDefined();

  global.innerWidth = 499;
  global.dispatchEvent(new Event('resize'));

  expect(() => {
    getByText(memberView);
  }).toThrow();
});


test('Testing that the inputlist is loaded correctly and addbutton works',
    () => {
      const selectedGroup = {
        'groupid': undefined,
        'groupname': 'testgroup1',
        'adminid': 1,
      };

      const members = [];

      const currentUser = {
        userid: 1,
        username: 'test',
        email: 'test@test.no',
        avatar: 'testing',
        password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      };

      const {getAllByText, getByPlaceholderText} = render(<GroupPage
        selectedGroup={selectedGroup}
        currentUser={currentUser}
        members={members}
        isLoggedIn={true}
        checkIfGroupAdmin={() => {
          return true;
        }}
        history={history}
        getGroupMembers={() => { }}
      />);

      const allComps = getAllByText('');

      const listInput = getByPlaceholderText('Navn på ny handleliste...');

      fireEvent.change(listInput, {target: {value: 'testlist'}});
      const submitBtn = allComps[25];
      fireEvent.click(submitBtn);
    });
