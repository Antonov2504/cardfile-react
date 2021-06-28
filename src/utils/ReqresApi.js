import { handleOriginalResponse } from './utils';

function ReqresApi(options) {
  const { baseUrl } = options;
  // const [token, setToken] = useState(localStorage.getItem('token') || '');

  // const register = (name, email, password) => {
  //   return fetch(`${baseUrl}/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ name, email, password }),
  //     credentials: 'include',
  //   })
  //     .then(handleOriginalResponse)
  // }

  const authorize = (email, password) => {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      // credentials: 'include'
    })
      .then(handleOriginalResponse)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
        return data;
      })
  }

  // const getUserInfo = () => {
  //   const token = localStorage.getItem('token');
  //   return fetch(`${baseUrl}/users/me`, {
  //     headers: setMainApiBaseResponsHeaders(token),
  //     credentials: 'include',
  //   })
  //     .then(handleOriginalResponse)
  // }

  const getUsers = () => {
    const token = localStorage.getItem('token');
    return fetch(`${baseUrl}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // credentials: 'include',
    })
      .then(handleOriginalResponse)
  }

  const editUserData = (user) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseUrl}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user }),
      // credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  // const saveMovie = (movie) => {
  //   const movieImgUrl = movie.image ? `${moviesBaseUrl}${movie.image.url}` : `${mainAppUrl}${plugImage}`;
  //   const thumbnailImgUrl = movie.image ? `${moviesBaseUrl}${movie.image.formats.thumbnail.url}` : `${mainAppUrl}${plugImage}`;
  //   return fetch(`${baseUrl}/movies`, {
  //     method: 'POST',
  //     headers: setMainApiBaseResponsHeaders(token),
  //     body: JSON.stringify({
  //       country: movie.country,
  //       director: movie.director,
  //       duration: movie.duration,
  //       year: movie.year,
  //       description: movie.description,
  //       image: movieImgUrl,
  //       trailer: movie.trailerLink,
  //       thumbnail: thumbnailImgUrl,
  //       movieId: movie.id,
  //       nameRU: movie.nameRU,
  //       nameEN: movie.nameEN,
  //     }),
  //     credentials: 'include',
  //   })
  //     .then(handleOriginalResponse);
  // }

  const deleteUser = (user) => {
    const token = localStorage.getItem('token');
    return fetch(`${baseUrl}/movies/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  return {
    authorize,
    getUsers,
    editUserData,
    deleteUser
  }
}

export default ReqresApi;
