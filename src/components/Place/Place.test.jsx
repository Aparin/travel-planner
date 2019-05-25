/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Place from './Place';

describe('Place', () => {
  it('renders Place without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Place name="name" keys="1" deletePlace={jest.fn()} />,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Place snapshot', () => {
    const component = renderer.create(
      <Place name="name" keys="1" deletePlace={jest.fn()} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
