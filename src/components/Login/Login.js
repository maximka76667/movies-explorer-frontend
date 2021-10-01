import React from 'react';
import { Link } from 'react-router-dom';
import { useInputChange } from '../../utils/useInputChange';
import Logo from '../Logo/Logo';
import './Login.css';

function Login(props) {

  // const [input, handleInputChange] = useInputChange();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Validation Constants
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  // ClassNames
  const emailInputClassName = (
    `login__form-input ${isEmailError ? 'login__form-error_error' : ''}`
  );

  const passwordInputClassName = (
    `login__form-input ${isPasswordError ? 'login__form-error_error' : ''}`
  );

  const emailErrorClassName = (
    `login__form-error ${isEmailError ? 'login__form-error' : ''}`
  );

  const passwordErrorClassName = (
    `login__form-error ${isPasswordError ? 'login__form-error' : ''}`
  );

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin({ email, password });
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
      case 'email': {
        if (!inputElement.validity.valid) {
          setIsEmailError(true);
          setEmailError(inputElement.validationMessage);
          setIsEmailValid(false);
          return;
        }
        setIsEmailValid(true);
        setEmailError('');
        break;
      }
      case 'password': {
        if (!inputElement.validity.valid) {
          setIsPasswordError(true);
          setPasswordError(inputElement.validationMessage);
          setIsPasswordValid(false);
          return;
        }
        setIsPasswordValid(true);
        setIsPasswordError(false);
        setPasswordError('');
        break;
      }
      default: { }
    }
  }

  React.useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      return setIsSubmitValid(true);
    }
    return setIsSubmitValid(false);
  }, [isEmailValid, isPasswordValid])

  return (
    <div className="login">
      <div className="login__content">
        <Logo />
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-field">
            <label className="login__form-label">E-mail</label>
            <input className={emailInputClassName} name="email" type="email" value={email} onChange={handleEmailInputChange} required />
            <p className="login__form-error">{emailError}</p>
          </div>
          <div className="login__form-field">
            <label className="login__form-label">Пароль</label>
            <input className={passwordInputClassName} name="password" type="password" value={password} onChange={handlePasswordInputChange} required />
            <p className="login__form-error">{passwordError}</p>
          </div>
          <button className="login__submit-button" type="submit" disabled={!isSubmitValid ? true : false}>Войти</button>
        </form>
        <p className="login__register">Ещё не зарегистрированы?<Link className="login__register-link" to="/signup">Регистрация</Link></p>
      </div>
    </div>
  )
}

export default Login;