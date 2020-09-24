import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {Overview} from '../../components/groupoverview/Overview';

test('Overview page renders without error', () => {
  const groups = [
    {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
    {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
    {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
  ];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const getGroupWithUserID = (id) => {
    return true;
  };

  const component = renderer.create(
      <Overview
        isLoggedIn={true}
        getGroupWithUserID={getGroupWithUserID}
        groups={groups}
        currentUser={currentUser} />,
  );

  expect(component).toBeDefined();
});

test('Testing that groups load correctly and clicking them changes the path',
    () => {
      const history = createMemoryHistory();
      history.location.pathname = '/overview';

      const groups = [
        {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
        {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
        {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
      ];

      const currentUser = {
        userid: 1,
        username: 'test',
        email: 'test@test.no',
        avatar: 'testing',
        password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      };

      const getGroupWithUserID = (id) => {
        return true;
      };

      const dummyFunction = (group) => {
        return true;
      };

      const {getByText} = render(<Overview
        isLoggedIn={true}
        getGroupWithUserID={getGroupWithUserID}
        currentUser={currentUser}
        groups={groups}
        history={history}
        selectedGroup={dummyFunction} />);

      for (const group of groups) {
        let groupitem = undefined;
        groupitem = getByText(group.groupname);
        expect(groupitem).toBeDefined();
        fireEvent.click(groupitem);
        expect(history.location.pathname).toBe(`/overview/${group.groupname}`);
      }
    });

test('Testing that the logout button renders and works correctly', () => {
  const groups = [
    {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
    {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
    {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
  ];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const getGroupWithUserID = (id) => {
    return true;
  };

  const history = createMemoryHistory();
  history.location.pathname = '/overview';

  const {getByText} = render(<Overview
    isLoggedIn={true}
    groups={groups}
    getGroupWithUserID={getGroupWithUserID}
    currentUser={currentUser}
    history={history} />);

  const logoutButton = getByText('Logg ut');
  expect(logoutButton).toBeDefined();

  fireEvent.click(logoutButton);
  expect(history.location.pathname).toBe('/');
});

test('Testing that the profile button is loaded correctly', () => {
  const groups = [
    {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
    {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
    {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
  ];

  const history = createMemoryHistory();
  history.location.pathname = '/overview';

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const getGroupWithUserID = (id) => {
    return true;
  };

  const {getByText} = render(<Overview
    isLoggedIn={true}
    groups={groups}
    getGroupWithUserID={getGroupWithUserID}
    currentUser={currentUser}
    history = {history}
  />);

  const profileButton = getByText(currentUser.username);
  expect(profileButton).toBeDefined();
  fireEvent.click(profileButton);
  expect(history.location.pathname).toBe('/profile');
});

test('Testing that the input field is loaded correctly', () => {
  const groups = [
    {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
    {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
    {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
  ];

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const getGroupWithUserID = (id) => {
    return true;
  };
  const {getAllByPlaceholderText} = render(<Overview
    isLoggedIn={true}
    groups={groups}
    getGroupWithUserID={getGroupWithUserID}
    currentUser={currentUser} />);

  const groupnameInput = getAllByPlaceholderText('Navn på ny gruppe...')[0];
  expect(groupnameInput).toBeDefined();
});

test('Testing that the button for adding a new group is loaded correctly',
    () => {
      const groups = [
        {'groupid': 41, 'groupname': 'testgroup1', 'adminid': 1},
        {'groupid': 42, 'groupname': 'testgroup2', 'adminid': 1},
        {'groupid': 43, 'groupname': 'testgroup3', 'adminid': 1},
      ];

      const currentUser = {
        userid: 1,
        username: 'test',
        email: 'test@test.no',
        avatar: 'testing',
        password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      };

      const getGroupWithUserID = (id) => {
        return true;
      };
      const {getAllByText, getByPlaceholderText} = render(<Overview
        isLoggedIn={true}
        groups={groups}
        getGroupWithUserID={getGroupWithUserID}
        currentUser={currentUser} />);


      const groupInput = getByPlaceholderText('Navn på ny gruppe...');
      fireEvent.change(groupInput, {target: {value: 'testgroup'}});

      const allItems = getAllByText('');
      const addGroupButton = allItems[allItems.length - 1];
      expect(addGroupButton).toBeDefined();
      fireEvent.click(addGroupButton);
    // this would have thrown an error if something was not right
    });
