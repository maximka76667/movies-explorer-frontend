import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img className="logo__img" src={logo} alt="Лого" />
      </Link>
      <div className="header__links">
        <Link className="header__link header__link_to_movies" to="/movies">Фильмы</Link>
        <Link className="header__link header__link_to_saved-movies" to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <Link className="header__link header__link_to_my-account" to="/profile">Аккаунт</Link>
    </header>
  )
}

export default Header;