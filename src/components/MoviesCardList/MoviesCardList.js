import React from 'react';
import { useLocation } from 'react-router';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import moviesApi from '../../utils/MoviesApi';

function MoviesCardList(props) {

  const [cardList, setCardList] = React.useState([]);
  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);
  const [countCardsOfWidth, setCountCardsOfWidth] = React.useState(0);

  const location = useLocation();

  const renderCards = (cardsCount, renderedCards) => {
    const cardsForRender = [];

    const countCardsForRender = location.pathname === "/saved-movies" ? cardList.length : cardsCount;

    for (let i = 0; i < countCardsForRender; i++) {
      const newCardIndex = i + renderedCards.length
      const newCard = cardList[newCardIndex];

      if (newCardIndex >= cardList.length - 1) {
        if (newCardIndex === cardList.length - 1) {
          cardsForRender.push(newCard);
        }
        setIsAllCardsRendered(true);
        break;
      }

      cardsForRender.push(newCard);
    }

    setRenderedCardList([...renderedCards, ...cardsForRender]);
  }

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
    moviesApi.getMovies()
      .then((movies) => {
        console.log(movies);
        setCardList(movies);
        console.log(renderedCardList);
      })
      .then(() => {
        window.addEventListener('resize', (e) => {
          checkCountOfCards();
        })

        checkCountOfCards();
        renderCards(countCardsOfWidth, renderedCardList);
      })
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setIsAllCardsRendered(false);
    setRenderedCardList([]);
    renderCards(countCardsOfWidth, []);
    // eslint-disable-next-line
  }, [countCardsOfWidth]);

  return (
    <div className="card-list">
      {props.isSearching && <Preloader />}
      {!props.isSearching &&
        <div className="card-list__container">
          {
            renderedCardList.map((card) => {
              return <MoviesCard key={card.id} card={card} />
            })
          }
        </div>
      }
      {!props.isSearching && <More renderCards={renderCards} isAllCardsRendered={isAllCardsRendered} countCardsOfWidth={countCardsOfWidth} renderedCardList={renderedCardList} />}
    </div>
  )
}

export default MoviesCardList;