class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password,
      })
    })
      .then(this._checkResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": data.email,
        "password": data.password,
      })
    })
      .then(this._checkResponse)
  }

  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  getEmail(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }
}

const auth = new Auth({
  baseUrl: 'https://api.max76667.movies.nomoredomains.club'
})

export default auth;