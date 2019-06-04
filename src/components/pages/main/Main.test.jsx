/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';

describe('Main', () => {
  it('renders Main without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>, div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Main snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
