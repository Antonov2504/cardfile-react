import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import PageNotFound from './PageNotFound';
// import Header from './Header';
import Main from './Main';
// import Footer from '../Footer/Footer';
// import { mainApiBaseUrl, moviesApiBaseUrl, noDataMessage, serverRejectMessage } from '../../utils/constants';
import { reqresApiBaseUrl, serverRejectMessage } from '../utils/constants';
import ReqresApi from './../utils/ReqresApi';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  // const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);                                                    // Стейт-переменная статус пользователя, вход в систему
  // const [currentUser, setCurrentUser] = useState({                                                    // Стейт данные текущего пользователя
  //   _id: '',
  //   name: '',
  //   email: '',
  // });
  const [users, setUsers] = useState('');                                                 // Стейт массив найденных фильмов
  // const [searchMovies, setSearchMovies] = useState([]);                                               // Стейт массив найденных фильмов
  // const [filteredMovies, setFilteredMovies] = useState([]);                                               // Стейт массив найденных фильмов
  // const [savedMovies, setSavedMovies] = useState([]);                                                 // Стейт массив сохраненных фильмов
  // const [renderedMovies, setRenderedMovies] = useState([]);                                                 // Стейт массив сохраненных фильмов
  // const [isNavOpened, setIsNavOpened] = useState(false);                                              // Стейт мобильная навигация открыта
  const [isLoadingCards, setIsLoadingCards] = useState(false);                                        // Стейт прелоадер загрузки карточек
  // const [isNoSearchResult, setIsNoSearchResult] = useState({                                          // Стейт нет результатов поиска
  //   status: false,
  //   message: noDataMessage
  // });
  // const [isNoMovies, setIsNoMovies] = useState({                                                      // Стейт нет сохраненных фильмов
  //   status: false,
  //   message: noDataMessage
  // });
  // const [isErrorRegisterResponse, setIsErrorRegisterResponse] = useState({                            // Стейт ошибки загрузки данных с сервера
  //   status: false,
  //   message: serverRejectMessage
  // });
  const [isErrorSigninResponse, setIsErrorSigninResponse] = useState({                                // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isErrorEditUserDataResponse, setIsErrorEditUserDataResponse] = useState({                      // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isError, setIsError] = useState({                                                            // Стейт ошибки загрузки данных
    status: false,
    message: serverRejectMessage
  });
  // const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);                                   // Стейт прелоадер загрузки информации пользователя
  // const [isLoadingRegister, setIsLoadingRegister] = useState(false);                                  // Стейт прелоадер загрузки регистрации пользователя
  const [isLoadingSignin, setIsLoadingSignin] = useState(false);                                      // Стейт прелоадер загрузки входа пользователя
  const [isLoadingEditProfile, setIsLoadingEditUserData] = useState(false);                            // Стейт прелоадер загрузки входа пользователя
  // const [disabledInputEditProfile, setDisabledInputEditProfile] = useState(true);

  const reqresApi = ReqresApi({
    baseUrl: reqresApiBaseUrl,
  });

  // const moviesApi = MoviesApi({
  //   baseUrl: moviesApiBaseUrl,
  // });

  // Изменить возможность ввода у инпута
  function changeInputsAbility(input, ability) {
    console.log('change input ability');
    console.log(input, ability);
    // setInputsAbility([
    //   ...inputsAbility,
    //   input
    // ])
  }

  // Обработчик по кнопке Войти
  function handleLogin(email, password) {
    console.log('handleLogin');
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
          // mainApi.getUserInfo()
          //   .then(res => {
          //     setCurrentUser({ ...res.data });
          //     // setIsLoadingUserInfo(false);
          //     history.push('/movies');
          //   })
          //   .catch(err => console.log(err));
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

  // Обработчик по кнопке Зарегистрироваться
  // function handleRegister(name, email, password) {
  //   setIsLoadingRegister(true);
  //   mainApi.register(name, email, password)
  //     .then(data => {
  //       if (!data._id) {
  //         setIsErrorRegisterResponse({
  //           ...isErrorRegisterResponse,
  //           status: true,
  //           message: JSON.parse(data).message
  //         });
  //       } else {
  //         setIsLoadingRegister(false);
  //         setIsErrorRegisterResponse({
  //           ...isErrorRegisterResponse,
  //           status: false
  //         });
  //         history.push('/movies');
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  // // Обработчик клика по меню
  // function handleNavClick() {
  //   setIsNavOpened(!isNavOpened);
  // }

  // Обработчик формы поиска фильмов
  // function handleSearchSubmit(inputValue, isShort) {
  //   setIsLoadingCards(true);
  //   setIsNoSearchResult({
  //     ...isNoSearchResult,
  //     status: false
  //   });
  //   moviesApi.getMovies()
  //     .then(movies => {
  //       const regex = new RegExp(inputValue, 'i');
  //       setSearchMovies(movies.filter((movie) => {
  //         if ((movie.nameRU && movie.nameRU.match(regex)) || (movie.nameEN && movie.nameEN.match(regex))) {
  //           if (savedMovies.some((sm) => sm.movieId === movie.id && currentUser._id === sm.owner)) {
  //             movie.isSaved = true;
  //           };
  //           if (isShort && movie.duration <= 40) {
  //             return movie;
  //           }
  //           if (!isShort) {
  //             return movie;
  //           }
  //         }
  //       }))
  //       setIsLoadingCards(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsError({
  //         ...isError,
  //         status: true
  //       });
  //     });
  // }

  // Обработчик формы поиска сохраненных фильмов
  // function handleSearchSavedMoviesSubmit(inputValue, isShort) {
  //   setIsLoadingCards(true);
  //   const regex = new RegExp(inputValue, 'i');
  //   setFilteredMovies(savedMovies.filter((movie) => {
  //     if ((movie.nameRU && movie.nameRU.match(regex)) || (movie.nameEN && movie.nameEN.match(regex))) {
  //       if (isShort && movie.duration <= 40) {
  //         return movie;
  //       }
  //       if (!isShort) {
  //         return movie;
  //       }
  //     }
  //   }))
  //   setIsLoadingCards(false);
  // }

  // Обработчик сохранения карточки
  // function handleCardSave(card) {
  //   mainApi.saveMovie(card)
  //     .then(movie => {
  //       setIsNoMovies({
  //         ...isNoMovies,
  //         status: false,
  //       });
  //       setSavedMovies([
  //         movie,
  //         ...savedMovies
  //       ]);
  //     })
  //     .catch(err => console.log(err));
  // }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    // if (!card._id) {
    //   card = savedMovies.find((m) => m.movieId === card.id);
    // }
    reqresApi.deleteUser(card)
      .then(user => {
        setUsers(users.filter((u) => u.id !== user.id));
      })
      .catch(err => console.log(err));
  }

  // Выход из аккаунта
  function handleSignout() {
    setLoggedIn(false);
    // setIsNavOpened(false);
    // setSearchMovies([]);
    localStorage.removeItem('token');
    // localStorage.removeItem('lastSearchMovies');
    history.push('/signin');
  }

  // Обработчик клика по редактированию профиля пользователя
  function handleEditUserData(card) {
    console.log('handleEditProfile');
    // setDisabledInputEditProfile(false);
  }

  // Обработчик обновления информации пользователя
  function handleEditUserDataSubmit(user) {
    setIsLoadingEditUserData(true);
    setIsErrorEditUserDataResponse({
      ...isErrorEditUserDataResponse,
      status: false,
      message: serverRejectMessage
    });
    reqresApi.editUserData(user)
      .then(data => {
        if (data.updatedAt) {
          setUsers({
            ...users,
            data
          });
          setIsLoadingEditUserData(false);
          changeInputsAbility(user, false);
        } else {
          setIsErrorEditUserDataResponse({
            ...isErrorEditUserDataResponse,
            status: true,
            message: data.message
          });
          setIsLoadingEditUserData(false);
        }
      })
      .catch(err => console.log(err));
  }

  // function handleChangeInputMovie(inputValue) {
  //   setSearchMovie(inputValue);
  // }

  // Проверка токена при повторном посещении сайта
  // useEffect(() => {
  //   if (mainApi.token) {
  //     mainApi.getUserInfo()
  //       .then(res => {
  //         if (res) {
  //           setLoggedIn(true);
  //           setCurrentUser({ ...res.data });
  //           // setIsLoadingUserInfo(false);
  //           history.push('/movies');
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   } else {
  //     setLoggedIn(false);
  //   }
  //   if (localStorage.getItem('lastSearchMovies')) setSearchMovies(JSON.parse(localStorage.getItem('lastSearchMovies')))
  // }, []);

  // Загрузка сохраненных пользователем фильмов
  // useEffect(() => {
  //   mainApi.getSavedMovies()
  //     .then(savedMovies => {
  //       if (savedMovies.data) {
  //         setIsLoadingCards(false);
  //         setIsNoMovies({
  //           ...isNoMovies,
  //           status: false
  //         });
  //         setSavedMovies(savedMovies.data.reverse());
  //       } else {
  //         setIsLoadingCards(false);
  //         setIsNoMovies({
  //           ...isNoMovies,
  //           status: true,
  //           message: savedMovies.message
  //         });
  //         setSavedMovies([]);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, [loggedIn]);

  // useEffect(() => {
  //   if (!searchMovies.length) {
  //     setIsNoSearchResult({
  //       ...isNoSearchResult,
  //       status: true,
  //       message: noDataMessage
  //     });
  //   }
  //   localStorage.setItem('lastSearchMovies', JSON.stringify(searchMovies));
  // }, [searchMovies]);

  // useEffect(() => {
  //   setIsNoSearchResult({
  //     ...isNoSearchResult,
  //     status: false,
  //     message: noDataMessage
  //   });
  //   setRenderedMovies(filteredMovies);
  //   if (!filteredMovies.length) {
  //     setIsNoSearchResult({
  //       ...isNoSearchResult,
  //       status: true,
  //       message: noDataMessage
  //     });
  //   }
  // }, [filteredMovies]);

  // useEffect(() => {
  //   setIsNoSearchResult({
  //     ...isNoSearchResult,
  //     status: false,
  //     message: noDataMessage
  //   });
  //   setRenderedMovies(savedMovies);
  // }, [savedMovies]);

  // useEffect(() => {
  //   if (!searchMovie.length) {
  //     setIsNoSearchResult({
  //       ...isNoSearchResult,
  //       status: false,
  //       message: noDataMessage
  //     });
  //     setRenderedMovies(savedMovies);
  //   }
  // }, [searchMovie])

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
            cards={users}
            isLoadingCards={isLoadingCards}
            isError={isError}
            onCardDelete={handleCardDelete}
            onCardEdit={handleEditUserData}
          >
          </ProtectedRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
