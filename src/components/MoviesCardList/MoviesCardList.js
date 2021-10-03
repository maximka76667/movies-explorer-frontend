import React from 'react';
import { useLocation } from 'react-router';
import CardsNotFound from '../CardsNotFound/CardsNotFound';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  const location = useLocation();

  const [cardList, setCardList] = React.useState([]);

  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(true);
  const [countCardsOfWidth, setCountCardsOfWidth] = React.useState(0);

  const renderItem = (card) => (
    <MoviesCard key={card.id || card.movieId} card={card} cardId={card._id} onSaveMovie={props.onSaveMovie} onUnsaveMovie={props.onUnsaveMovie} cardList={cardList} savedMovies={props.savedMovies} />
  )


  function renderCardList(countCardsOfWidth, cardList) {
    setIsAllCardsRendered(false);
    const cardsForRender = [];

    const countCardsForRender = location.pathname === "/saved-movies" ? props.cardList.length : countCardsOfWidth;

    for (let i = 0; i < countCardsForRender; i++) {
      const newCardIndex = i + cardList.length;
      const newCard = props.cardList[newCardIndex] || 0;

      if (newCardIndex >= props.cardList.length - 1) {
        if (newCardIndex === props.cardList.length - 1) {
          cardsForRender.push(newCard);
        }
        setIsAllCardsRendered(true);
        break;
      }

      cardsForRender.push(newCard);
    }

    setCardList([...cardList, ...cardsForRender]);
  }

  React.useEffect(() => {
    renderCardList(countCardsOfWidth, []);
    // eslint-disable-next-line
  }, [props.cardList])

  function checkCountOfCards() {
    const width = window.innerWidth;

    if (width > 800) {
      setCountCardsOfWidth(3);
    }

    if (width > 650 && width <= 800) {
      setCountCardsOfWidth(2);
    }

    if (width <= 650) {
      setCountCardsOfWidth(1);
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', (e) => {
      checkCountOfCards();
    })

    checkCountOfCards();

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    renderCardList(countCardsOfWidth, []);
    // eslint-disable-next-line
  }, [countCardsOfWidth]);

  React.useEffect(() => {
    if (cardList.length === 0) {
      setIsAllCardsRendered(true);
    }
  }, [cardList])

  return (
    <div className="card-list">
      {props.isSearching && <Preloader />}
      {!props.isSearching && props.isNotFound && <CardsNotFound />}
      {!props.isSearching && !props.isNotFound && props.isResult &&
        <>
          <div className="card-list__container">
            {
              cardList.map(renderItem)
            }
          </div>
          <More renderCardList={renderCardList} isAllCardsRendered={isAllCardsRendered} countCardsOfWidth={countCardsOfWidth} cardList={cardList} />
        </>
      }
    </div>
  )
}

export default MoviesCardList;