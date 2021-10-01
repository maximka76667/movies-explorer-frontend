import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {

  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  function handleSaveImage() {
    if (isMovieSaved) {
      props.onUnsaveMovie(props.card);
      setIsMovieSaved(false);
    }
    if (!isMovieSaved) {
      props.onSaveMovie(props.card);
      setIsMovieSaved(true);
    }
  }

  function formatDuration(duration) {
    const hours = (duration - (duration % 60)) / 60;
    const minutes = duration - hours * 60;

    return `${hours ? hours + 'ч' : ''} ${minutes ? minutes + 'м' : ''}`;
  }

  return (
    <div className={`card ${isMovieSaved ? "card_saved" : ''}`}>
      <a className="card__poster" href={props.card.trailerLink}>
        <img className="card__poster-img" src={`https://api.nomoreparties.co${props?.card?.image?.url}`} alt={props.card.nameEN} />
      </a>
      <div className="card__info">
        <h2 className="card__name">{props.card.nameRU}</h2>
        <p className="card__duration">{formatDuration(props.card.duration)}</p>
      </div>
      <button className="card__save-button" onClick={handleSaveImage}>{!isMovieSaved && "Сохранить"}</button>
    </div>
  )
}

export default MoviesCard;