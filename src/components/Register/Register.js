import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Validation Constants
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isNameError, setIsNameError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  // ClassNames
  const nameInputClassName = (
    `register__form-input ${isNameError ? 'register__form-input_error' : ''}`
  );

  const emailInputClassName = (
    `register__form-input ${isEmailError ? 'register__form-input_error' : ''}`
  );

  const passwordInputClassName = (
    `register__form-input ${isPasswordError ? 'register__form-input_error' : ''}`
  );

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister({ name, email, password });
  }

  function handleNameInputChange(e) {
    setName(e.target.value);

    handleValidation(e);
  }

  function handleEmailInputChange(e) {
    setEmail(e.target.value);

    handleValidation(e);
  }

  function handlePasswordInputChange(e) {
    setPassword(e.target.value);

    handleValidation(e);
  }

  function handleValidation(e) {
    const inputElement = e.target;

    switch (inputElement.name) {
      case 'name': {
        if (!inputElement.validity.valid) {
          setIsNameError(true);
          setNameError(inputElement.validationMessage);
          return;
        }
        setIsNameError(false);
        setNameError('');
        break;
      }
      case 'email': {
        if (!inputElement.validity.valid) {
          setIsEmailError(true);
          setEmailError(inputElement.validationMessage);
          return;
        }
        setIsEmailError(false);
        setEmailError('');
        break;
      }
      case 'password': {
        if (!inputElement.validity.valid) {
          setIsPasswordError(true);
          setPasswordError(inputElement.validationMessage);
          return;
        }
        setIsPasswordError(false);
        setPasswordError('');
        break;
      }
      default: { }
    }
  }

  React.useEffect(() => {
    if (isNameError || isEmailError || isPasswordError) return setIsSubmitValid(false);
    return setIsSubmitValid(true);
  }, [isNameError, isEmailError, isPasswordError, name, email, password])

  React.useEffect(() => {
    setIsNameError(true);
    setIsEmailError(true);
    setIsPasswordError(true);
    setIsSubmitValid(false);
  }, [])

  return (
    <div className="register">
      <div className="register__content">
        <Logo />
        <h1 className="register__heading">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__form-field">
            <label className="register__form-label">Имя</label>
            <input className={nameInputClassName} name="name" type="text" value={name} onChange={handleNameInputChange} required />
            <p className="register__form-error">{nameError}</p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">E-mail</label>
            <input className={emailInputClassName} name="email" type="email" value={email} onChange={handleEmailInputChange} required />
            <p className="register__form-error">{emailError}</p>
          </div>
          <div className="register__form-field">
            <label className="register__form-label">Пароль</label>
            <input className={passwordInputClassName} name="password" type="password" value={password} onChange={handlePasswordInputChange} required />
            <p className="register__form-error">{passwordError}</p>
          </div>
          <button className="register__submit-button" type="submit" disabled={!isSubmitValid}>Зарегистрироваться</button>
        </form>
        <p className="register__login">Уже зарегистрированы?<Link className="register__login-link" to="/signin">Войти</Link></p>
      </div>
    </div>
  )
}

export default Register;