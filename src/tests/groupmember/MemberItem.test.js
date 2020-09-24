import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemberItem from '../../components/groupmember/MemberItem';

test('Testing that the component renders correctly without errors', () => {
  const member = {
    'userid': 100,
    'username': 'test',
    'email': 'test@test.no',
    'avatar': 'testing',
    'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
    'contribution': 0,
  };

  const currentUser = {
    'userid': 100,
    'username': 'test',
    'email': 'test@test.no',
    'avatar': 'testing',
    'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
    'contribution': 0,
  };
  const component = render(<MemberItem
    member={member}
    currentUser = {currentUser}
    editMode = {true}
    removeUserById = {(id) => {}}
  />);

  expect(component).toBeDefined();
});

test('Testing that the user is not the member and editmode false', () => {
  const member = {
    'userid': 10,
    'username': 'test',
    'email': 'test@test.no',
    'avatar': 'testing',
    'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
    'contribution': 0,
  };

  const currentUser = {
    'userid': 100,
    'username': 'test',
    'email': 'test@test.no',
    'avatar': 'testing',
    'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
    'contribution': 0,
  };
  const component = render(<MemberItem
    member={member}
    currentUser = {currentUser}
    editMode = {false}
    removeUserById = {(id) => {}}
  />);

  expect(component).toBeDefined();
});

test('Testing that the user is not the member and editmode true', () => {
    const member = {
      'userid': 10,
      'username': 'test',
      'email': 'test@test.no',
      'avatar': 'testing',
      'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      'contribution': 0,
    };
  
    const currentUser = {
      'userid': 100,
      'username': 'test',
      'email': 'test@test.no',
      'avatar': 'testing',
      'password': '135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4',
      'contribution': 0,
    };
    const component = render(<MemberItem
      member={member}
      currentUser = {currentUser}
      editMode = {true}
      removeUserById = {(id) => {}}
    />);
  
    expect(component).toBeDefined();
  });
