import React from 'react';
import './MoviesCard.css'

function MoviesCard(props) {

  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  function handleSaveImage() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <div className="card">
      <div className={`card__poster ${isMovieSaved ? 'card__poster_saved' : ''}`}>
        <img className={`card__poster-img`} src='/static/media/movie-poster1.4aaf8340.jpg' alt={props.card.name} onClick={handleSaveImage} />
      </div>
      <div className="card__info">
        <h2 className="card__name">{props.card.name}</h2>
        <p className="card__duration">{props.card.duration}</p>
      </div>
    </div>
  )
}

export default MoviesCard;