import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register(props) {
  return (
    <div className="register">
      <div className="register__content">
        <Logo />
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form">
          <div className="register__form-field">
            <label className="register__form-label">Имя</label>
            <input className="register__form-input" type="text" />
            <p className="register__form-error"></p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">E-mail</label>
            <input className="register__form-input" type="email" />
            <p className="register__form-error"></p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">Пароль</label>
            <input className="register__form-input register__form-input_error" type="password" />
            <p className="register__form-error">Что-то пошло не так...</p>
          </div>
          <button className="register__submit-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__login">Уже зарегистрированы?<Link className="register__login-link" to="/signin">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;