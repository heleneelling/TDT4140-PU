import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import ShoppingList from '../../components/grouppage/ShoppingList';

test('Shoppinglistrenders without error, and runs getItem', () => {
  const shoppingList =
        {'listid': 33, 'listname': 'newlist', 'iscomplete': 0, 'groupid': 63};

  const component = renderer.create(
      <ShoppingList
        shoppingList={shoppingList}
        listClickHandler={(id) => { }}
        isTest = {true} />);

  expect(component).toBeDefined();
});
