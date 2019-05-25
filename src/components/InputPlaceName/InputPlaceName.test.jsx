/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import InputPlaceName from './InputPlaceName';

describe('InputPlaceName', () => {
  it('renders InputPlaceName without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InputPlaceName addPoint={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('InputPlaceName snapshot', () => {
    const component = renderer.create(
      <InputPlaceName addPoint={() => {}} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
