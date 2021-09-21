import React from 'react';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  // const [cardList, setCardList] = React.useState(null);
  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);
  // const [countCardsForRender, setCountCardsForRender] = React.useState(3);

  const cardList = [
    {
      name: '33 слова о дизайне',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      duration: '1ч 17м'
    },
  ];

  function renderCards() {
    const cardsForRender = [];

    for (let i = 0; i < 3; i++) {
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