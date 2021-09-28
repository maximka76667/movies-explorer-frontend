import React from 'react';
import { useLocation } from 'react-router';
import moviesApi from '../../utils/MoviesApi';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);
  const [countCardsOfWidth, setCountCardsOfWidth] = React.useState(0);

  const location = useLocation();

  const renderCards = (cardsCount, renderedCards) => {
    const cardsForRender = [];

    const countCardsForRender = location.pathname === "/saved-movies" ? props.cardList?.length : cardsCount;

    for (let i = 0; i < countCardsForRender; i++) {
      const newCardIndex = i + renderedCards.length
      const newCard = props.cardList[newCardIndex];

      if (newCardIndex >= props.cardList.length - 1) {
        if (newCardIndex === props.cardList.length - 1) {
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

  function clearCardList() {
    setIsAllCardsRendered(false);
    setRenderedCardList([]);
  }

  React.useEffect(() => {
    window.addEventListener('resize', (e) => {
      checkCountOfCards();
    })

    checkCountOfCards();
    renderCards(countCardsOfWidth, renderedCardList);

    if (location.pathname === '/saved-movies') {
      moviesApi.getMovies()
        .then((movies) => props.handleCardListChange(movies))
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    clearCardList();
    renderCards(countCardsOfWidth, []);
    // eslint-disable-next-line
  }, [countCardsOfWidth]);

  React.useEffect(() => {
    clearCardList();
    renderCards(countCardsOfWidth, []);
    // eslint-disable-next-line
  }, [props.cardList])

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