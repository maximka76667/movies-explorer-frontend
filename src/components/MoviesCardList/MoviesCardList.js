import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {

  // const [cardList, setCardList] = React.useState(null);

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

  return (
    <div className="card-list">
      {false && <Preloader />}
      <div className="card-list__container">
        {cardList.map((card, i) => {
          return <MoviesCard key={i} card={card} />
        })}
      </div>
    </div>
  )
}

export default MoviesCardList;