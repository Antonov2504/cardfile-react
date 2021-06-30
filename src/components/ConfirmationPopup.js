import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ cardId, isOpen, onClose, onCardDelete, isLoading, isErrorResponse }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(cardId);
  }

  return (
    <PopupWithForm
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="delete-card"
      title="Вы уверены?"
    >
      {isErrorResponse.status && <p className="sign__error">{isErrorResponse.message}</p>}
      {isLoading && <div className="preloader preloader_type_button" />}
      {!isLoading && <button type="submit" className="form__button">Да</button>}
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
