import React from 'react';
import useFormValidation from '../utils/useFormValidation';
import validateData from '../utils/validateData';

function Login({ isLoading, isErrorResponse, handleLogin }) {
  const { inputValues, handleChange, validationErrors, isValidForm } = useFormValidation({ email: '', password: '' }, validateData);
  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = inputValues;
    if (!email || !password) {
      return;
    }
    if (isValidForm) handleLogin(email, password);
  }

  return (
    <section className="sign">
      <div className="logo logo_align_left">B</div>
      <p className="sign__heading">Рады видеть!</p>
      <form
        name="login-form"
        className="sign__form"
        onSubmit={handleSubmit}>
        <fieldset className="sign__fieldset">
          <label className="sign__label">
            <span className="sign__field">E-mail</span>
            <input
              type="text"
              name="email"
              value={inputValues.email}
              className={`sign__input ${validationErrors.email && 'sign__input_type_error'}`}
              onChange={handleChange}
              autoComplete="off"
            />
            {validationErrors.email &&
              <p className="sign__validity">{validationErrors.email}</p>
            }
          </label>
          <label className="sign__label">
            <span className="sign__field">Пароль</span>
            <input
              type="password"
              name="password"
              value={inputValues.password}
              className={`sign__input ${validationErrors.password && 'sign__input_type_error'}`}
              onChange={handleChange}
            />
            {validationErrors.password &&
              <p className="sign__validity">{validationErrors.password}</p>
            }
          </label>
        </fieldset>
        {isErrorResponse.status && <p className="sign__error">{isErrorResponse.message}</p>}
        {isLoading && <div className="sign__preloader" />}
        {!isLoading && <button type="submit" className="sign__button" disabled={!isValidForm}>Войти</button>}
      </form>
    </section>
  );
}

export default Login;