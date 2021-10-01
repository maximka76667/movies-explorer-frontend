import React from 'react';
import './Profile.css';
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  // Validation Constants
  const [isNameError, setIsNameError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  function handleChangeName(e) {
    if (props.isEdit) {
      setName(e.target.value);
      handleValidation(e);
    }
  }

  function handleChangeEmail(e) {
    if (props.isEdit) {
      setEmail(e.target.value);
      handleValidation(e);
    }
  }

  const inputNameClassName = (
    `profile__field-value ${props.isEdit ? "profile__field-value_edit" : ''} ${isNameError ? "profile__field-value_error" : ""}`
  );

  const inputEmailClassName = (
    `profile__field-value ${props.isEdit ? "profile__field-value_edit" : ''} ${isEmailError ? "profile__field-value_error" : ""}`
  )

  function handleValidation(e) {
    const inputElement = e.target;

    switch (inputElement.name) {
      case 'name': {
        if (!inputElement.validity.valid) {
          setIsNameError(true);
          setIsSubmitValid(false);
          return;
        }
        setIsNameError(false);
        setIsSubmitValid(true);
        break;
      }
      case 'email': {
        if (!inputElement.validity.valid) {
          setIsEmailError(true);
          setIsSubmitValid(false);
          return;
        }
        setIsEmailError(false);
        setIsSubmitValid(true);
        break;
      }
      default: { }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (props.isEdit) {
      props.onUserUpdate({
        name,
        email,
      })
    }
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <div className="profile">
        <h1 className="profile__greeting">Привет, {currentUser.name}</h1>
        <form className="profile__content" onSubmit={handleSubmit}>
          <div className="profile__info">
            <div className="profile__field">
              <h2 className="profile__field-name">Имя</h2>
              <input className={inputNameClassName} onChange={handleChangeName} type="text" value={name} disabled={!props.isEdit} required />
            </div>
            <hr className="profile__line" />
            <div className="profile__field">
              <h2 className="profile__field-name">E-mail</h2>
              <input className={inputEmailClassName} onChange={handleChangeEmail} type="email" value={email} disabled={!props.isEdit} required />
            </div>
          </div>
          <button className="profile__edit-button" type="submit" disabled={false}>{props.isEdit ? props.isLoading ? "Загрузка..." : "Сохранить" : "Редактировать"}</button>
          <button className="profile__exit-button" onClick={props.onLogout}>Выйти из аккаунта</button>
        </form>
      </div>
    </>
  )
}

export default Profile;