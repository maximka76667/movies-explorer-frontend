import React from 'react';
import CardsNotFound from '../CardsNotFound/CardsNotFound';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const renderItem = (card) => (
    <MoviesCard key={card.id} card={card} onSaveMovie={props.onSaveMovie} onUnsaveMovie={props.onUnsaveMovie} />
  )

  return (
    <div className="card-list">
      {props.isSearching && <Preloader />}
      {!props.isSearching && props.isNotFound && <CardsNotFound />}
      {!props.isSearching && !props.isNotFound && props.isResult &&
        <>
          <div className="card-list__container">
            {
              props.cardList.map(renderItem)
            }
          </div>
          <More renderCards={props.renderCards} isAllCardsRendered={props.isAllCardsRendered} countCardsOfWidth={props.countCardsOfWidth} renderedCardList={props.renderedCardList} />
        </>
      }
    </div>
  )
}

export default MoviesCardList;