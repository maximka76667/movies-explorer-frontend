import React from 'react';
import More from '../More/More';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  // const [cardList, setCardList] = React.useState(null);
  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);

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
  ];

  function renderCards() {
    const cardsForRender = [];

    for (let i = 0; i < 3; i++) {
      console.log(renderedCardList);
      console.log(i + renderedCardList.length);

      const newCard = cardList[i + renderedCardList.length] || null;

      if (!newCard) {
        setIsAllCardsRendered(true);
        break;
      }

      cardsForRender.push(newCard);
    }

    console.log(cardsForRender);

    setRenderedCardList([...renderedCardList, ...cardsForRender]);
  }

  React.useEffect(() => {
    if (renderedCardList.includes({})) {
      console.log('Карты кончились');
    }
  }, renderedCardList)

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
      {!isAllCardsRendered && <More renderCards={renderCards} />}
    </div>
  )
}

export default MoviesCardList;