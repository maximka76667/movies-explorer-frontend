import './Navigation.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Navigation(props) {
  return (
    <div className="nav">
      <Link to="/" className="logo">
        <img className="logo__img" src={logo} alt="Лого" />
      </Link>
      <div className="nav__links">
        <Link className="nav__link nav__link_to_movies" to="/movies">Фильмы</Link>
        <Link className="nav__link nav__link_to_saved-movies" to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link className="nav__link nav__link_to_my-account" to="/profile">Аккаунт</Link>
    </div>
  )
}

export default Navigation;