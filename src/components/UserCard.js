import React, { useEffect, useState } from 'react';
import plugImage from '../images/no-photo.svg';
import { noDataMessage } from '../utils/constants';

function UserCard({ card, onCardEdit, onCardDelete }) {
  const [cardImage, setCardImage] = useState({
    src: card.avatar,
    alt: `${card.first_name} ${card.last_name}`,
    errored: false
  });

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleError() {
    if (!cardImage.errored) {
      setCardImage({
        ...cardImage,
        src: plugImage,
        alt: noDataMessage,
        errored: true
      });
    }
  }

  useEffect(() => {
    setCardImage({
      ...cardImage,
      src: card.avatar || plugImage,
      alt: `${card.first_name} ${card.last_name}`,
      errored: false
    });
  }, [card]);

  return (
    <li className="card">
      <div className="card__info">
        <img src={cardImage.src} alt={cardImage.alt} className={`card__image ${cardImage.errored && 'card__image_type_no-image'}`} onError={handleError} />
        <h2 className="card__name">{card.first_name} {card.last_name}</h2>
        <p className="card__email">{card.email}</p>
      </div>
      <div className="card__buttons">
        <button type="button" className="card__button card__button_type_edit" onClick={() => onCardEdit(card)}></button>
        <button type="button" className="card__button card__button_type_delete" onClick={handleDeleteClick}></button>
      </div>
    </li>
  );
}

export default UserCard;
