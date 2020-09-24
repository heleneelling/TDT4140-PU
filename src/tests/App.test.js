import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';
import App from '../App';


test('App renders without error', () => {
  const component = renderer.create(<Router><App isTest = {true} /></Router>);

  expect(component).toBeDefined();
});
