import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

function Login(props) {
  return (
    <div className="login">
      <div className="login__content">
        <Logo />
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="login__form">
          <div className="login__form-field">
            <label className="login__form-label">E-mail</label>
            <input className="login__form-input" type="email" />
          </div>
          <div className="login__form-field">
            <label className="login__form-label">Пароль</label>
            <input className="login__form-input" type="password" />
          </div>
          <button className="login__submit-button" type="submit">Войти</button>
        </form>
        <p className="login__register">Ещё не зарегистрированы?<Link className="login__register-link" to="/signup">Регистрация</Link></p>
      </div>
    </div>
  )
}

export default Login;