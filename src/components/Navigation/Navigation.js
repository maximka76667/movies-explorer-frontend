import './Navigation.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router';
import Logo from '../Logo/Logo';

function Navigation(props) {
  const location = useLocation();

  return (
    <div className="nav">
      <Logo />
      {
        location.pathname !== '/' ?
          (
            <>
              <ul className="nav__links">
                <li className="nav__item"><Link className="nav__link nav__link_to_movies" to="/movies">Фильмы</Link></li>
                <li className="nav__item"><Link className="nav__link nav__link_to_saved-movies" to="/saved-movies">Сохранённые фильмы</Link></li>
              </ul>
              <Link className="nav__link nav__link_to_my-account" to="/profile">Аккаунт</Link>
            </>
          ) :
          (
            <ul className="nav__links">
              <li class="nav__item"><Link className="nav__link nav__link_to_signup" to="/signup">Регистрация</Link></li>
              <li class="nav__item"><Link className="nav__link nav__link_to_signin" to="/signin">Войти</Link></li>
            </ul>
          )
      }
    </div >
  )
}

export default Navigation;