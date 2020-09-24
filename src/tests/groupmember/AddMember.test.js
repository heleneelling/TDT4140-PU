import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMember from '../../components/groupmember/AddMember';

test('Testing that the component renders correctly without errors', () => {
  const {getByPlaceholderText, getAllByText} = render(<AddMember
    addMemberByEmail={(email) => { }}
  />);

  const submitBtn = getAllByText('')[5];
  const useremailInput = getByPlaceholderText('E-post...');
  expect(submitBtn).toBeDefined();
  expect(useremailInput).toBeDefined();

  fireEvent.change(useremailInput, {target: {value: 'newmember'}});
  fireEvent.click(submitBtn);
});
