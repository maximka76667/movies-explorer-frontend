import React from 'react';
import './More.css';

function More(props) {
  return (
    <div className="more">
      {!props.isAllCardsRendered && <button className="more__button" onClick={() => props.renderCardList(props.countCardsOfWidth, props.cardList)}>Ещё</button>}
    </div>
  )
}

export default More;