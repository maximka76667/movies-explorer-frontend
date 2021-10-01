import './Navigation.css'
import { NavLink as Link } from 'react-router-dom'
import React from 'react';

function Navigation(props) {
  return (
    <>
      {
        props.loggedIn ?
          (
            <nav className={`nav ${props.isMenuOpen ? 'nav_open' : ''} nav_with-menu`}>
              <div className="nav__burger-icon" onClick={props.toggleMenu}></div>
              <div className="nav__overlay"></div>
              <div className="nav__menu">
                <ul className="nav__links">
                  <li className="nav__item"><Link className="nav__link nav__link_to_main" exact to="/" activeClassName="nav__link_active">Главная</Link></li>
                  <li className="nav__item"><Link className="nav__link nav__link_to_movies" to="/movies" activeClassName="nav__link_active">Фильмы</Link></li>
                  <li className="nav__item"><Link className="nav__link nav__link_to_saved-movies" to="/saved-movies" activeClassName="nav__link_active">Сохранённые фильмы</Link></li>
                </ul>
                <Link className="nav__link nav__link_to_my-account" to="/profile">Аккаунт</Link>
                <div className="nav__close-button" onClick={props.toggleMenu}></div>
              </div>
            </nav>
          ) : (
            <nav className="nav">
              <div className="nav__menu">
                <ul className="nav__links">
                  <li className="nav__item"><Link className="nav__link nav__link_to_signup" to="/signup">Регистрация</Link></li>
                  <li className="nav__item"><Link className="nav__link nav__link_to_signin" to="/signin">Войти</Link></li>
                </ul>
              </div>
            </nav>
          )
      }
    </>
  )
}

export default Navigation;