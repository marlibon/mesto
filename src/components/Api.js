export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      authorization: options.headers.authorization,
      "Content-Type": "application/json",
    };
  }

  _getResponseData(response) { 
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((response) => {
      return this._getResponseData(response)
    })
  }

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((response) => {
      return this._getResponseData(response)
    })
  }

  patchUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((response) => {
      return this._getResponseData(response)
    })
  }

  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      return this._getResponseData(response)
    })
  }

  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => {
      return this._getResponseData(response)
    })
  }

  setLike = (id, value) => {
    value = value ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${value}`,
      headers: this._headers,
    }).then((response) => {
      return this._getResponseData(response)
    })
  }
  replaceAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((response) => {
      return this._getResponseData(response)
    })
  }
}
