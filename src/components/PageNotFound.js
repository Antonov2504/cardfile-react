import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFoundPage() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <section className="notFoundPage">
      <div className="notFoundPage__container">
        <p className="notFoundPage__title">404</p>
        <p className="notFoundPage__subtitle">Страница не найдена</p>
      </div>
      <button type="button" className="notFoundPage__button" onClick={handleClick}>Назад</button>
    </section>
  );
}

export default NotFoundPage;