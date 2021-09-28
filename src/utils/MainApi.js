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
}

const mainApi = new Api({
  baseUrl: 'https://api.max76667.movies.nomoredomains.club',
})

export default mainApi;