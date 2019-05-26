/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Map from './Map';

describe('Map', () => {
  it('renders Map without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map center={[]} onError={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Map snapshot', () => {
    const component = renderer.create(
      <Map center={[]} onError={() => {}} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
