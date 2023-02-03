export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      authorization: options.headers.authorization,
      "Content-Type": "application/json",
    };
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
  };

  patchUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
      
  };

  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })

    
  }

  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
  }

  setLike = (id, value) => {
    value = value ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${value}`,
      headers: this._headers
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
  }
  replaceAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })

  }
}
