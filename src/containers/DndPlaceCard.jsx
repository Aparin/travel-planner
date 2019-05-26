import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

const ItemTypes = { CARD: 'card' };

const style = {
  border: '1px dashed gray',
  padding: '5px',
  margin: '5px auto',
  backgroundColor: 'white',
  cursor: 'move',
  display: 'block',
};
const DndPlaceCard = React.forwardRef(
  ({
    contents, isDragging, connectDragSource, connectDropTarget,
  }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));
    return (
      <div ref={elementRef} style={Object.assign({}, style, { opacity })}>
        {contents}
      </div>
    );
  },
);

DndPlaceCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  contents: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return undefined;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return undefined;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return undefined;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      monitor.getItem().index = hoverIndex;
      return undefined;
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(DndPlaceCard),
);
