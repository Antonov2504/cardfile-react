import { handleOriginalResponse } from './utils';

function ReqresApi(options) {
  const { baseUrl } = options;

  const authorize = (email, password) => {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
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

  const getUsers = (pageNumber) => {
    return fetch(`${baseUrl}/users?page=${pageNumber}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse)
  }

  const createUser = (user) => {
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(handleOriginalResponse);
  }

  const updateUser = (user) => {
    return fetch(`${baseUrl}/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(handleOriginalResponse);
  }

  const deleteUser = (userId) => {
    return fetch(`${baseUrl}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return {
    authorize,
    getUsers,
    createUser,
    updateUser,
    deleteUser
  }
}

export default ReqresApi;
