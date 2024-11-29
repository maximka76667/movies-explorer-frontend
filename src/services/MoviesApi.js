class Api {
  constructor({ baseUrl, authorization }) {
    this._baseUrl = baseUrl;
    this._token = authorization;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl)
      .then(this._checkResponse)
  }
}

const moviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default moviesApi;