import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function Header() {
  const value = useContext(AppContext);
  return (
    <header className="header">
      <div className="logo">B</div>
      {/* Меню авторизованный пользователь */}
      {value.loggedIn &&
        <Link to="/signin" className="header__button">Выйти</Link>
      }
    </header >
  );
}

export default Header;
