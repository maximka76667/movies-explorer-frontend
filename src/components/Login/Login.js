import { Link } from 'react-router-dom';
import { useInputChange } from '../../utils/useInputChange';
import Logo from '../Logo/Logo';
import './Login.css';

function Login(props) {

  const [input, handleInputChange] = useInputChange();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(input);

    props.onLogin(input);
  }

  return (
    <div className="login">
      <div className="login__content">
        <Logo />
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-field">
            <label className="login__form-label">E-mail</label>
            <input className="login__form-input" name="email" type="email" onChange={handleInputChange} required />
          </div>
          <div className="login__form-field">
            <label className="login__form-label">Пароль</label>
            <input className="login__form-input" name="password" type="password" onChange={handleInputChange} required />
          </div>
          <button className="login__submit-button" type="submit">Войти</button>
        </form>
        <p className="login__register">Ещё не зарегистрированы?<Link className="login__register-link" to="/signup">Регистрация</Link></p>
      </div>
    </div>
  )
}

export default Login;