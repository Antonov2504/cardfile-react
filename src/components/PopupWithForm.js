import React from 'react';

function PopupWithForm({ isOpened, name, title, children, onClose, onSubmit }) {
  return (
    <div className={`popup ${isOpened && 'popup_opened'} popup_type_${name}`} onClick={(e) => { if (e.target.classList.contains('popup')) onClose() }}>
      <div className="popup__container">
        <button type="button" className="popup__button popup__button_type_close-popup" onClick={onClose}></button>
        <form action="#" name={`${name}`} className="form" onSubmit={onSubmit} noValidate>
          <h2 className={`popup__heading`}>{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
