/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import DndPlaceCard from './DndPlaceCard';

describe('DndPlaceCard', () => {
  it('renders DndPlaceCard without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <DragDropContextProvider backend={HTML5Backend}>
        <DndPlaceCard
          key={1}
          index={1}
          id={1}
          contents={(<div>Name of Place</div>)}
          moveCard={jest.fn()}
        />
      </DragDropContextProvider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('DndPlaceCard snapshot', () => {
    const component = renderer.create(
      <DragDropContextProvider backend={HTML5Backend}>
        <DndPlaceCard
          key={1}
          index={1}
          id={1}
          contents={(<div>Name of Place</div>)}
          moveCard={jest.fn()}
        />
      </DragDropContextProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
