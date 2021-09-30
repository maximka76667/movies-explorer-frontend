class Api {
  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._token = authorization;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`)
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkResponse);
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse);
  }

  unsaveMovie(movieId) {
    return fetch(`${this._baseUrl}/cards/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
      .then(this._checkResponse);
  }

  changeMovieSavedStatus(movieId, isSaved) {
    return fetch(`${this._baseUrl}/cards/${movieId}/likes`, {
      method: isSaved ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token,
      },
    })
      .then(this._checkResponse);
  }

  changeToken(token) {
    this._token = `Bearer ${token}`
  }
}

const mainApi = new Api({
  baseUrl: 'https://api.max76667.movies.nomoredomains.club',
})

export default mainApi;