import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import App from './components/App';

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <App />
  </DragDropContextProvider>,
  document.getElementById('root'),
);
