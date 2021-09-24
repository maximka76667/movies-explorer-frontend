import './Profile.css';
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__greeting">Привет, Максим</h1>
        <div className="profile__content">
          <div className="profile__info">
            <div className="profile__field">
              <h2 className="profile__field-name">Имя</h2>
              <p className="profile__field-value">Виталий</p>
            </div>
            <hr className="profile__line" />
            <div className="profile__field">
              <h2 className="profile__field-name">E-mail</h2>
              <p className="profile__field-value">pochta@yandex.ru</p>
            </div>
          </div>
          <button className="profile__edit-button">Редактировать</button>
          <button className="profile__exit-button">Выйти из аккаунта</button>
        </div>
      </div>
    </>
  )
}

export default Profile;