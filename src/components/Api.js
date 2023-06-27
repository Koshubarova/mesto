export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
    this._authorization = options.headers.authorization
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-69/cards', {
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject;
      });
  }

  _checkResponse(res) {return res.ok ? res.json() : Promise.reject}

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-69/users/me', {
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject)
  }


  setUserInfo(data) {
    return fetch('https://nomoreparties.co/v1/cohort-69/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.username,
        about: data.description,
      })
    })
      .then(this._checkResponse)
  }

  setPhoto(data) {
    return fetch('https://nomoreparties.co/v1/cohort-69/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.photo,
      })
    })
    .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch('https://nomoreparties.co/v1/cohort-69/cards', {
      method: 'POST',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283'
      }
    })
    .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283'
      }
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-69/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '39c56915-9550-44c8-84ed-160de228f283'
      }
    })
    .then(this._checkResponse)
  }
}
