import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {

  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  function handleSaveImage() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <div className={`card ${isMovieSaved ? "card_saved" : ''}`}>
      <a className="card__poster" href="yandex.ru">
        <img className={`card__poster-img`} src='https://api.nomoreparties.co/uploads/blur_a43fcf463d.jpeg' alt={props.card.name} href="yandex.ru" />
      </a>
      <div className="card__info">
        <h2 className="card__name">{props.card.name}</h2>
        <p className="card__duration">{props.card.duration}</p>
      </div>
      <button className="card__save-button" onClick={handleSaveImage}>{!isMovieSaved && "Сохранить"}</button>
    </div>
  )
}

export default MoviesCard;