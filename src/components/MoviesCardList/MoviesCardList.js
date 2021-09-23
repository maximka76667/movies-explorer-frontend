import React from 'react';
import { useLocation } from 'react-router';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  // const [cardList, setCardList] = React.useState(null);
  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);
  // const [countCardsForRender, setCountCardsForRender] = React.useState(3);

  const location = useLocation();

  const cardList = [
    {
      name: '33 слова о дизайне1',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»2',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»3',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»4',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»5',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»6',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»7',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»8',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»9',
      duration: '1ч 17м'
    },
  ];

  function renderCards() {
    const cardsForRender = [];

    const countCardsForRender = location.pathname === "/saved-movies" ? cardList.length : 3;

    for (let i = 0; i < countCardsForRender; i++) {
      const newCardIndex = i + renderedCardList.length
      const newCard = cardList[newCardIndex];

      cardsForRender.push(newCard);

      if (newCardIndex === cardList.length - 1) {
        setIsAllCardsRendered(true);
        break;
      }
    }

    setRenderedCardList([...renderedCardList, ...cardsForRender]);
  }

  // React.useEffect(() => {
  //   window.addEventListener('resize', (e) => {
  //     if (window.innerWidth > 800) {
  //       setCountCardsForRender(3);
  //     }
  //     if (window.innerWidth > 600) {
  //       setCountCardsForRender(2);
  //     }
  //   })
  // }, [countCardsForRender])

  React.useEffect(() => {
    renderCards();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card-list">
      {props.isSearching && <Preloader />}
      {!props.isSearching &&
        <div className="card-list__container">
          {
            renderedCardList.map((card, i) => {
              return <MoviesCard key={i} card={card} />
            })
          }
        </div>
      }
      {!props.isSearching && <More renderCards={renderCards} isAllCardsRendered={isAllCardsRendered} />}
    </div>
  )
}

export default MoviesCardList;