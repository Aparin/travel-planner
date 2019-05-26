/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import DndConteiner from './DndConteiner';

const names = ['Moscow', 'Piter'];
const keys = [1, 2];
const item1 = (<div>Moscow</div>);
const item2 = (<div>Piter</div>);

const nameItems = [{ id: 1, contents: item1 }, { id: 2, contents: item2 }];

describe('DndConteiner', () => {
  it('renders DndConteiner without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <DragDropContextProvider backend={HTML5Backend}>
        <DndConteiner nameItems={nameItems} names={names} keys={keys} movePlace={() => {}} />
      </DragDropContextProvider>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  test('DndConteiner snapshot', () => {
    const component = renderer.create(
      <DragDropContextProvider backend={HTML5Backend}>
        <DndConteiner nameItems={nameItems} names={names} keys={keys} movePlace={jest.fn()} />
      </DragDropContextProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
