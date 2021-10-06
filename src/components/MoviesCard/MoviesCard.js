import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {
  const [cardId, setCardId] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);

  function handleSaveMovie() {
    if (isSaved) {
      setIsSaved(false);
      console.log(cardId);
      props.onUnsaveMovie(cardId ?? props.cardId);
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
    setIsSaved(props.savedMovies.find(movie => movie.movieId === props.card.id || movie.movieId === props.card.movieId));
    props.savedMovies.forEach(movie => {
      if (movie.movieId === props.card.id || movie.movieId === props.card.movieId) setCardId(movie._id);
    })

    // eslint-disable-next-line
  }, [props.cardList, props.savedMovies])

  return (
    <div className={`card ${isSaved ? "card_saved" : ''}`}>
      <a className="card__poster" href={props.card.trailerLink ?? props.card.trailer} rel="noreferrer" target="_blank">
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