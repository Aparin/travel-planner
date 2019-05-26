import React, { useState } from 'react';
import update from 'immutability-helper';
import PlaceCard from './DndPlaceCard';

const style = {
  width: 330, margin: '0px auto',
};

const DndConteiner = ({
  nameItems, names, keys,
}) => {
  {
    const [cards, setCards] = useState(nameItems);
    if (nameItems.length !== cards.length) setCards(nameItems);

    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];

      // making new order of names
      const newOrderNames = names;
      const moveName = newOrderNames.splice(dragIndex, 1);
      newOrderNames.splice(hoverIndex, 0, ...moveName);

      // making new order of keys
      const newOrderKeys = keys;
      const moveKey = newOrderKeys.splice(dragIndex, 1);
      newOrderKeys.splice(hoverIndex, 0, ...moveKey);

      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      );
    };

    return (
      <div style={style}>
        {cards.map((card, i) => (
          <PlaceCard
            key={card.id}
            index={i}
            id={card.id}
            contents={card.contents}
            moveCard={moveCard}
          />
        ))}
      </div>
    );
  }
};
export default DndConteiner;
