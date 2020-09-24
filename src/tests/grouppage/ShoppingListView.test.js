import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import ShoppingListView from '../../components/grouppage/ShoppingListView';

test('Shoppinglistview renders without error, and runs testrun', () => {
  const selectedGroup = {
    'groupid': 41,
    'groupname': 'testgroup1',
    'adminid': 1,
  };

  const history = createMemoryHistory();

  const component = renderer.create(
      <ShoppingListView
        isTest = {true}
        selectedGroup = {selectedGroup}
        history = {history}
        listClickHandler = {(id) => {}}/>);

  expect(component).toBeDefined();
});
