import React from 'react';
import mainApi from '../../utils/MainApi';
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

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        movies.movies.map(card => {
          if (card._id === props.card._id) {
            setIsMovieSaved(true);
          }
          return null;
        })
      })
  }, [])

  return (
    <div className={`card ${isMovieSaved ? "card_saved" : ''}`}>
      <a className="card__poster" href={props.card.trailerLink}>
        <img className="card__poster-img" src={props.card.image.url || `https://api.nomoreparties.co${props.card.image}`} alt={props.card.nameEN} />
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