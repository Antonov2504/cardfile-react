import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';
import validateData from '../utils/validateData';

function EditProfilePopup({ currentUser, isOpen, onClose, onUpdate, isLoading, isErrorResponse }) {
  const {
    inputValues,
    setFormInputValues,
    clearValidationErrors,
    handleChange,
    validationErrors,
    isValidForm
  } = useFormValidation({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    avatar: currentUser.avatar
  }, validateData);

  useEffect(() => {
    clearValidationErrors();
    setFormInputValues(currentUser);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { id, first_name, last_name, email, avatar } = inputValues;
    if (!first_name || !last_name || !email) {
      return;
    }
    if (isValidForm) onUpdate({ id, first_name, last_name, email, avatar });
  }

  return (
    <PopupWithForm
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-user-data"
      title="Редактировать профиль"
    >
      <label className="form__field">
        <input
          type="text"
          name="first_name"
          value={inputValues.first_name}
          placeholder="Имя"
          className={`form__input ${validationErrors.first_name && 'form__input_type_error'}`}
          onChange={handleChange}
          autoComplete="off" />
        {validationErrors.first_name &&
          <p className="validity-error">{validationErrors.first_name}</p>
        }
      </label>
      <label className="form__field">
        <input
          type="text"
          name="last_name"
          value={inputValues.last_name}
          placeholder="Фамилия"
          className={`form__input ${validationErrors.last_name && 'form__input_type_error'}`}
          onChange={handleChange}
          autoComplete="off" />
        {validationErrors.last_name &&
          <p className="validity-error">{validationErrors.last_name}</p>
        }
      </label>
      <label className="form__field">
        <input
          type="text"
          name="email"
          value={inputValues.email}
          placeholder="Email"
          className={`form__input ${validationErrors.email && 'form__input_type_error'}`}
          onChange={handleChange}
          autoComplete="off" />
        {validationErrors.email &&
          <p className="validity-error">{validationErrors.email}</p>
        }
      </label>
      <label className="form__field">
        <input
          type="text"
          name="avatar"
          value={inputValues.avatar}
          placeholder="Ссылка на аватар"
          className={`form__input ${validationErrors.avatar && 'form__input_type_error'}`}
          onChange={handleChange}
          autoComplete="off" />
        {validationErrors.avatar &&
          <p className="validity-error">{validationErrors.avatar}</p>
        }
      </label>
      {isErrorResponse.status && <p className="server-error">{isErrorResponse.message}</p>}
      {isLoading && <div className="preloader preloader_type_button" />}
      {!isLoading && <button type="submit" className="form__button" disabled={!isValidForm}>Сохранить</button>}
    </PopupWithForm>
  );
}

export default EditProfilePopup;