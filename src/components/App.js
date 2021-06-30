import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import EditProfilePopup from './EditProfilePopup';
import AddUserPopup from './AddUserPopup';
import ConfirmationPopup from './ConfirmationPopup';
import ReqresApi from './../utils/ReqresApi';
import { reqresApiBaseUrl, serverRejectMessage } from '../utils/constants';
import { AppContext } from '../contexts/AppContext';
import getWindowDimensions from '../utils/getWindowDimensions';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);                                                    // Стейт-переменная статус пользователя, вход в систему
  const [users, setUsers] = useState([]);                                                             // Стейт массив найденных пользователей
  const [renderedUsers, setRenderedUsers] = useState([]);                                             // Стейт массив пользователей для рендера на странице
  const [editableUser, setEditableUser] = useState({                                                  // Стейт редактируемого пользователя
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  })
  const [deletedUserId, setDeletedUserId] = useState(0);                                              // Стейт id пользователя для удаления
  const [windowDimensions, setWindowDimensions] = useState({});                                       // Стейт размеров окна
  const [showMoreCards, setShowMoreCards] = useState(false);                                          // Стейт показать больше карточек
  const [isAllCards, setIsAllCards] = useState(false);                                                // Стейт все карточки загружены
  const lastIndexPage = useRef(1);                                                                    // Последний индекс страницы запроса на сервер
  const [isLoadingCards, setIsLoadingCards] = useState(false);                                        // Стейт прелоадер загрузки карточек
  const [isLoadingSignin, setIsLoadingSignin] = useState(false);                                      // Стейт прелоадер загрузки входа пользователя
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);                                            // Стейт прелоадер загрузки добавления пользователя
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);                                      // Стейт прелоадер загрузки обновления пользователя
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);                                      // Стейт прелоадер загрузки удаления пользователя
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false);                                // Стейт попап добавления нового пользователя открыт
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);                                  // Стейт попап обновления данных пользователя открыт
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);                      // Стейт попап подтверждения удаления карточки открыт
  const [isErrorSigninResponse, setIsErrorSigninResponse] = useState({                                // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isErrorCreateResponse, setIsErrorCreateResponse] = useState({
    status: false,
    message: serverRejectMessage
  });
  const [isErrorUpdateResponse, setIsErrorUpdateResponse] = useState({
    status: false,
    message: serverRejectMessage
  });
  const [isErrorDeleteResponse, setIsErrorDeleteResponse] = useState({
    status: false,
    message: serverRejectMessage
  });
  const [isError, setIsError] = useState({                                                            // Стейт ошибки загрузки данных
    status: false,
    message: serverRejectMessage
  });

  const reqresApi = ReqresApi({
    baseUrl: reqresApiBaseUrl,
  });

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsAddUserPopupOpen(false);
    setIsUpdatePopupOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  // Загрузка данных пользователей
  function downloadUsers() {
    setIsLoadingCards(true);
    reqresApi.getUsers(lastIndexPage.current)
      .then(res => {
        if (res.data.length && lastIndexPage.current <= res.total_pages) {
          setUsers(res.data);
          lastIndexPage.current++;
        } else {
          setUsers([]);
          setIsAllCards(true);
        }
        setIsLoadingCards(false);
      })
      .catch(err => {
        console.log(err);
        setIsError({
          ...isError,
          status: true
        });
      });
  }

  // Обработчик клика по кнопке добавить пользователя
  function handleAddUserClick() {
    setIsAddUserPopupOpen(true);
  }

  // Обработчик добавления пользователя
  function handleAddUserSubmit(newUser) {
    setIsLoadingAdd(true);
    setIsErrorCreateResponse({
      ...isErrorCreateResponse,
      status: false,
      message: serverRejectMessage
    });
    reqresApi.createUser(newUser)
      .then(res => {
        if (res.createdAt) {
          setRenderedUsers([
            res,
            ...renderedUsers
          ]);
          setIsLoadingAdd(false);
          closeAllPopups();
        } else {
          setIsErrorCreateResponse({
            ...isErrorCreateResponse,
            status: true,
            message: JSON.parse(res.text()).error
          });
        }
      })
  }

  // Обработчик клика по кнопке редактирования профиля
  function handleUpdateUserClick(currentUser) {
    setIsUpdatePopupOpen(true);
    setEditableUser({
      ...editableUser,
      id: currentUser.id,
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      email: currentUser.email,
      avatar: currentUser.avatar
    })
  }

  // Обработчик обновления данных пользователя
  function handleUpdateUserSubmit(userData) {
    setIsLoadingUpdate(true);
    setIsErrorUpdateResponse({
      ...isErrorUpdateResponse,
      status: false,
      message: serverRejectMessage
    });
    reqresApi.updateUser(userData)
      .then(res => {
        if (res.updatedAt) {
          const { first_name, last_name, email, avatar } = res;
          setRenderedUsers(renderedUsers.map(u => {
            if (u.id === userData.id) {
              return {
                ...u,
                first_name,
                last_name,
                email,
                avatar
              }
            }
            return u;
          }));
          setIsLoadingUpdate(false);
          closeAllPopups();
        } else {
          setIsErrorUpdateResponse({
            ...isErrorUpdateResponse,
            status: true,
            message: JSON.parse(res).error
          });
          setIsLoadingUpdate(false);
        }

      })
      .catch(err => console.log(err));
  }

  // Обработчик клика по кнопке удалить карточку
  function handleDeleteUserClick(user) {
    setDeletedUserId(user.id);
    setIsConfirmationPopupOpen(true);
  }

  // Обработчик удаления карточки
  function handleDeleteUserSubmit(userId) {
    setIsLoadingDelete(true);
    setIsErrorDeleteResponse({
      ...isErrorDeleteResponse,
      status: false,
      message: serverRejectMessage
    });
    reqresApi.deleteUser(userId)
      .then(res => {
        if (res.status === 204) {
          setRenderedUsers(renderedUsers.filter((u) => u.id !== userId));
          closeAllPopups();
        } else {
          setIsErrorDeleteResponse({
            ...isErrorDeleteResponse,
            status: true,
            message: JSON.parse(res.text()).error
          });
        }
        setIsLoadingDelete(false);
      })
      .catch(err => console.log(err));
  }

  // Обработчик по кнопке Войти
  function handleLogin(email, password) {
    setIsLoadingSignin(true);
    setIsErrorSigninResponse({
      ...isErrorSigninResponse,
      status: false
    });
    reqresApi.authorize(email, password)
      .then(data => {
        setIsLoadingSignin(false);
        if (data.token) {
          setLoggedIn(true);
          history.push('/');
        } else {
          setIsErrorSigninResponse({
            ...isErrorSigninResponse,
            status: true,
            message: JSON.parse(data).error
          });
        }
      })
      .catch(err => console.log(err));
  }

  // Выход из аккаунта
  function handleSignout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    lastIndexPage.current = 1;
    setIsAllCards(false);
    setRenderedUsers([]);
    downloadUsers();
    history.push('/signin');
  }

  // Проверка токена при повторном посещении сайта
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      history.push('/');
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Первичная загрузка данных пользователей
  useEffect(() => {
    downloadUsers();
    setRenderedUsers([...users]);
  }, []);

  // Отрисовать загруженных пользователей
  useEffect(() => {
    if (users.length) {
      setRenderedUsers([
        ...renderedUsers,
        ...users
      ]);
    }
  }, [users]);

  // Слушатель скролла на странице
  useEffect(() => {
    function handleScroll() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Проверка прокрутки скролла
  useEffect(() => {
    if (windowDimensions.height + windowDimensions.pageYOffset === windowDimensions.scrollHeight) {
      setShowMoreCards(true);
    } else {
      setShowMoreCards(false);
    }
  }, [windowDimensions])

  // Добавить пользователей по скроллу
  useEffect(() => {
    if (showMoreCards && !isAllCards) {
      downloadUsers();
    }
  }, [showMoreCards])

  // Добавить/удалить слушателя нажатия Esc при открытии попапа
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      };
    }

    (isAddUserPopupOpen || isUpdatePopupOpen || isConfirmationPopupOpen) && document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isAddUserPopupOpen, isUpdatePopupOpen, isConfirmationPopupOpen, closeAllPopups]);

  return (
    <AppContext.Provider value={{ loggedIn }}>
      <div className="page__container">
        <Switch>
          <Route path="/signin">
            <Login
              handleLogin={handleLogin}
              isLoading={isLoadingSignin}
              isErrorResponse={isErrorSigninResponse}
            />
          </Route>
          <ProtectedRoute
            exact path="/"
            component={Main}
            onAddUser={handleAddUserClick}
            onClickSignout={handleSignout}
            cards={renderedUsers}
            isLoadingCards={isLoadingCards}
            isAllCards={isAllCards}
            isError={isError}
            onCardEdit={handleUpdateUserClick}
            onCardDelete={handleDeleteUserClick}
          >
          </ProtectedRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {/* <!-- Попап редактировать профиль --> */}
        <EditProfilePopup
          currentUser={editableUser}
          isOpen={isUpdatePopupOpen}
          onClose={closeAllPopups}
          onUpdate={handleUpdateUserSubmit}
          isLoading={isLoadingUpdate}
          isErrorResponse={isErrorUpdateResponse}
        />
        {/* <!-- Попап добавить карточку --> */}
        <AddUserPopup
          isOpen={isAddUserPopupOpen}
          onClose={closeAllPopups}
          onAdd={handleAddUserSubmit}
          isLoading={isLoadingAdd}
          isErrorResponse={isErrorCreateResponse}
        />
        {/* <!-- Попап удаления карточки --> */}
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteUserSubmit}
          cardId={deletedUserId}
          isLoading={isLoadingDelete}
          isErrorResponse={isErrorDeleteResponse}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
