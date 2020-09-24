import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import GroupMemberPage from '../../components/groupmember/GroupMemberPage';

test('Testing that the component renders correctly without errors', () => {
  const history = createMemoryHistory();
  history.location.pathname = '/overview/testgroup1/members';

  const selectedGroup = {
    'groupid': undefined,
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

  const component = render(<GroupMemberPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    history={history}
    checkIfGroupAdmin={() => {
      return true;
    }}
    getGroupMembers={() => { }}
  />);

  expect(component).toBeDefined();
});

test('Testing goBack button', () => {
  const history = createMemoryHistory();

  const selectedGroup = {
    'groupid': undefined,
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

  const {getAllByText} = render(<GroupMemberPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={true}
    history={history}
    checkIfGroupAdmin={() => {
      return true;
    }}
    getGroupMembers={() => { }}
  />);

  const allComps = getAllByText('');
  const backButton = allComps[10];
  fireEvent.click(backButton);
});

test('Not found loads when user is not logged in', () => {
  const history = createMemoryHistory();
  history.location.pathname = '/overview/testgroup1/members';

  const selectedGroup = {
    'groupid': undefined,
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

  const component = render(<GroupMemberPage
    selectedGroup={selectedGroup}
    currentUser={currentUser}
    members={members}
    isLoggedIn={false}
    history={history}
    checkIfGroupAdmin={() => {
      return true;
    }}
    getGroupMembers={() => { }}
  />);

  expect(component).toBeDefined();
});
