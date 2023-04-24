export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _responseServer(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._responseServer(res));
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: card.name, link: card.link})
    })
      .then(res => this._responseServer(res));
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._responseServer(res));
  }

  setProfile(profile) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: profile.name, about: profile.about })
    })
    .then(res => this._responseServer(res));
  }

  setAvatar(profile) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: profile.avatar })
    })
    .then(res => this._responseServer(res));
  }

  renderUserAndCards() {
    return Promise.all([this.getProfile(), this.getCards()]);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._responseServer(res));
  }

  setLikedCard(cardId, method) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers
    })
    .then(res => this._responseServer(res));
  }

}