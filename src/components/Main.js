import React from 'react';
import Preloader from './Preloader';
import Plug from './Plug';
import UserCard from './UserCard';

function Main({ cards, isLoadingCards, isAllCards, isError, onCardEdit, onCardDelete }) {
  return (
    <section className="elements" >
      {isError && isError.status && <Plug text={isError.message} />}
      {!!cards.length &&
        <ul className={`cards ${isAllCards && 'cards_quantity_max'}`}>
          {
            cards.map(card => (
              <UserCard
                card={card}
                key={card.id}
                onCardEdit={onCardEdit}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      }
      {isLoadingCards && <Preloader />}
    </section >
  );
}

export default Main;
