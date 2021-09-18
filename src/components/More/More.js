import './More.css';

function More(props) {
  return (
    <div className="more">
      <button className="more__button" onClick={props.renderCards}>Ещё</button>
    </div>
  )
}

export default More;