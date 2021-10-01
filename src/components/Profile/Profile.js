import React from 'react';
import './Profile.css';
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [isEdit, setIsEdit] = React.useState(false);

  // Validation Constants
  const [isNameError, setIsNameError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  function handleChangeName(e) {
    if (isEdit) {
      setName(e.target.value);
      handleValidation(e);
    }
  }

  function handleChangeEmail(e) {
    if (isEdit) {
      setEmail(e.target.value);
      handleValidation(e);
    }
  }

  const inputNameClassName = (
    `profile__field-value ${isEdit ? "profile__field-value_edit" : ''} ${isNameError ? "profile__field-value_error" : ""}`
  );

  const inputEmailClassName = (
    `profile__field-value ${isEdit ? "profile__field-value_edit" : ''} ${isEmailError ? "profile__field-value_error" : ""}`
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

  function changeEditMode() {
    setIsEdit(!isEdit)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      email,
    });
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <div className="profile">
        <h1 className="profile__greeting">Привет, Максим</h1>
        <div className="profile__content">
          <form className="profile__info" onSubmit={handleSubmit}>
            <div className="profile__field">
              <h2 className="profile__field-name">Имя</h2>
              <input className={inputNameClassName} onChange={handleChangeName} value={name} disabled={!isEdit} />
            </div>
            <hr className="profile__line" />
            <div className="profile__field">
              <h2 className="profile__field-name">E-mail</h2>
              <input className={inputEmailClassName} onChange={handleChangeEmail} value={email} disabled={!isEdit} />
            </div>
          </form>
          <button className="profile__edit-button" onClick={changeEditMode}>{isEdit ? "Сохранить" : "Редактировать"}</button>
          <button className="profile__exit-button" onClick={props.onLogout}>Выйти из аккаунта</button>
        </div>
      </div>
    </>
  )
}

export default Profile;