import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {ShoppingListDetail} from
  '../../components/shoppinglistdetail/ShoppingListDetail';

test('Shoppinglist page renders without error', () => {
  const history = createMemoryHistory();
  const selectedList = {
    listid: 24,
    listname: 'ss',
    iscomplete: 0,
    groupid: 62,
  };

  const selectedGroup = {
    groupid: 62,
    groupname: 'sds',
    adminid: 1,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const component = renderer.create(
      <ShoppingListDetail
        isLoggedIn={true}
        contribution={0}
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        isTest = {true}
        itemClickHandler = { (p) => {}}
        history = {history}/>,
  );

  expect(component).toBeDefined();
});

test('Profile button renders without error', () => {
  const history = createMemoryHistory();
  const selectedList = {
    listid: 24,
    listname: 'ss',
    iscomplete: 0,
    groupid: 62,
  };

  const selectedGroup = {
    groupid: 62,
    groupname: 'sds',
    adminid: 1,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getByText} = render(
      <ShoppingListDetail
        isLoggedIn={true}
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        contribution={0}
        isTest = {true}
        itemClickHandler = { (p) => {}}
        history = {history}/>,
  );

  const button = getByText('test');

  expect(button).toBeDefined();
});

test('Clicking the button for adding an item to the list', () => {
  const history = createMemoryHistory();
  const selectedList = {
    listid: 24,
    listname: 'ss',
    iscomplete: 0,
    groupid: 62,
  };

  const selectedGroup = {
    groupid: 62,
    groupname: 'sds',
    adminid: 1,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getAllByText} = render(
      <ShoppingListDetail
        isLoggedIn={true}
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        contribution={0}
        isTest = {true}
        itemClickHandler = { (p) => {}} 
        history = {history}/>,
  );

  const allItems = getAllByText('');
  const addBtn = allItems[27];
  fireEvent.click(addBtn);
});

test('User not logged in', () => {
  const history = createMemoryHistory();
  const selectedList = {
    listid: 24,
    listname: 'ss',
    iscomplete: 0,
    groupid: 62,
  };

  const selectedGroup = {
    groupid: 62,
    groupname: 'sds',
    adminid: 1,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const component = renderer.create(
      <ShoppingListDetail
        isLoggedIn={false}
        contribution={0}
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        isTest = {true}
        itemClickHandler = { (p) => {}}
        history = {history}/>,
  );

  expect(component).toBeDefined();
});