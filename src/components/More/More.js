import './More.css';

function More(props) {
  return (
    <div className="more">
      {!props.isAllCardsRendered && <button className="more__button" onClick={null}>Ещё</button>}
    </div>
  )
}

export default More;