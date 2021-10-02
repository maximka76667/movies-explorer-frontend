import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {

  const [cardId, setCardId] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(props.savedMovies.find(movie => movie.movieId === props.card.id || movie.movieId === props.card.movieId));

  function handleSaveMovie() {
    if (isSaved) {
      console.log(props.savedMovies);
      props.onUnsaveMovie(cardId);
      setIsSaved(false);
    }
    if (!isSaved) {
      props.onSaveMovie(props.card);
      setIsSaved(true);
    }
  }

  function formatDuration(duration) {
    const hours = (duration - (duration % 60)) / 60;
    const minutes = duration - hours * 60;

    return `${hours ? hours + 'ч' : ''} ${minutes ? minutes + 'м' : ''}`;
  }

  React.useEffect(() => {
    props.savedMovies.forEach((movie) => {
      console.log(movie.movieId, props.card);
      if (movie.movieId === props.card.id || movie.movieId === props.card.movieId) {
        setCardId(movie._id);
      }
    });
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`card ${isSaved ? "card_saved" : ''}`}>
      <a className="card__poster" href={props.card.trailerLink}>
        <img className="card__poster-img" src={props.card.image.url ? `https://api.nomoreparties.co${props.card.image.url}` : props.card.image} alt={props.card.nameEN} />
      </a>
      <div className="card__info">
        <h2 className="card__name">{props.card.nameRU}</h2>
        <p className="card__duration">{formatDuration(props.card.duration)}</p>
      </div>
      <button className="card__save-button" onClick={handleSaveMovie}>{!isSaved && "Сохранить"}</button>
    </div>
  )
}

export default MoviesCard;