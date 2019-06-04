/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Help from './Help';

describe('Help', () => {
  it('renders Help without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Help />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Help snapshot', () => {
    const component = renderer.create(
      <Help />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
