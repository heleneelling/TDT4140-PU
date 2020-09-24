import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Item from '../../components/shoppinglistdetail/Item';

test('Item component renders without error', () => {
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

  const item = {
    'itemid': 1, 'itemname': 'Melk', 'price': 17,
    'imagepath': 'Melk.png', 'isChecked': false,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const component = renderer.create(
      <Item
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        item = {item}
        editMode = {true}
        itemClickHandler = {(item) => {}}/>,
  );

  expect(component).toBeDefined();
});

test('Clicking item delete button', () => {
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

  const item = {
    'itemid': 1, 'itemname': 'Melk', 'price': 17,
    'imagepath': 'Melk.png', 'isChecked': false,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getAllByText} = render(
      <Item
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        item = {item}
        editMode = {true}
        itemClickHandler = {(item) => {}}
        checkOrUncheckItem = {(item) => {}}/>,
  );

  const allItems = getAllByText('');
  const deleteButton = allItems[4];
  fireEvent.click(deleteButton);
});

test('Clicking item edit button', () => {
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

  const item = {
    'itemid': 1, 'itemname': 'Melk', 'price': 17,
    'imagepath': 'Melk.png', 'isChecked': false,
  };

  const currentUser = {
    userid: 1,
    username: 'test',
    email: 'test@test.no',
    avatar: 'testing',
    password: '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
  };

  const {getAllByText} = render(
      <Item
        selectedGroup={selectedGroup}
        selectedList={selectedList}
        currentUser={currentUser}
        item = {item}
        editMode = {false}
        itemClickHandler = {(item) => {}}
        checkOrUncheckItem = {(item) => {}}/>,
  );

  const allItems = getAllByText('');
  const editButton = allItems[4];
  fireEvent.click(editButton);
});
