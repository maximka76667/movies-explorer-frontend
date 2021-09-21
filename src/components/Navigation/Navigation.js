import './Navigation.css'
import { NavLink as Link } from 'react-router-dom'
import { useLocation } from 'react-router';

function Navigation(props) {
  const location = useLocation();

  return (
    <div className="nav">
      {
        location.pathname !== '/' ?
          (
            <>
              <ul className="nav__links">
                <li className="nav__item"><Link className="nav__link nav__link_to_movies" to="/movies" activeClassName="nav__link_active">Фильмы</Link></li>
                <li className="nav__item"><Link className="nav__link nav__link_to_saved-movies" to="/saved-movies" activeClassName="nav__link_active">Сохранённые фильмы</Link></li>
              </ul>
              <Link className="nav__link nav__link_to_my-account" to="/profile">Аккаунт</Link>
            </>
          ) :
          (
            <ul className="nav__links nav__links_loc_main">
              <li className="nav__item"><Link className="nav__link nav__link_to_signup" to="/signup">Регистрация</Link></li>
              <li className="nav__item"><Link className="nav__link nav__link_to_signin" to="/signin">Войти</Link></li>
            </ul>
          )
      }
    </div >
  )
}

export default Navigation;