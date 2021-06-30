import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header({ onAddUser, onClickSignout }) {
  const value = useContext(AppContext);

  return (
    <header className="header">
      <div className="logo">B</div>
      {/* Меню авторизованный пользователь */}
      {value.loggedIn &&
        <div className="header__buttons">
          <button type="button" className="header__button header__button_type_add-user" onClick={onAddUser}>Создать пользователя</button>
          <button type="button" className="header__button"><Link to="/signin" className="header__link" onClick={onClickSignout}>Выйти</Link></button>
        </div>
      }
    </header>
  );
}

export default Header;
