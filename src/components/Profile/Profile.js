import React from 'react';
import './Profile.css';
import Header from "../Header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);

  const [isEdit, setIsEdit] = React.useState(false);

  function handleChangeName(e) {
    if (isEdit) {
      setName(e.target.value);
    }
  }

  function handleChangeEmail(e) {
    if (isEdit) {
      setEmail(e.target.value);
    }
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <div className="profile">
        <h1 className="profile__greeting">Привет, Максим</h1>
        <div className="profile__content">
          <div className="profile__info">
            <div className="profile__field">
              <h2 className="profile__field-name">Имя</h2>
              <input className={`profile__field-value ${isEdit ? "profile__field-value_edit" : ''}`} onChange={handleChangeName} value={name} disabled={isEdit ? false : true} />
            </div>
            <hr className="profile__line" />
            <div className="profile__field">
              <h2 className="profile__field-name">E-mail</h2>
              <input className={`profile__field-value ${isEdit ? "profile__field-value_edit" : ''}`} onChange={handleChangeEmail} value={email} disabled={isEdit ? false : true} />
            </div>
          </div>
          <button className="profile__edit-button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? "Сохранить" : "Редактировать"}</button>
          <button className="profile__exit-button" onClick={props.onLogout}>Выйти из аккаунта</button>
        </div>
      </div>
    </>
  )
}

export default Profile;