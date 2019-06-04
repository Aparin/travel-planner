/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Main from './Main';

describe('Main', () => {
  it('renders Main without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Main snapshot', () => {
    const component = renderer.create(
      <Main />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
