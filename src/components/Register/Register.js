import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';
import { useInputChange } from '../../utils/useInputChange';

function Register(props) {

  const [input, handleInputChange] = useInputChange();

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister(input);
  }



  return (
    <div className="register">
      <div className="register__content">
        <Logo />
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__form-field">
            <label className="register__form-label">Имя</label>
            <input className="register__form-input" name="name" type="text" onChange={handleInputChange} required />
            <p className="register__form-error"></p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">E-mail</label>
            <input className="register__form-input" name="email" type="email" onChange={handleInputChange} required />
            <p className="register__form-error"></p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">Пароль</label>
            <input className="register__form-input" name="password" type="password" onChange={handleInputChange} required />
            <p className="register__form-error"></p>
          </div>
          <button className="register__submit-button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__login">Уже зарегистрированы?<Link className="register__login-link" to="/signin">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;