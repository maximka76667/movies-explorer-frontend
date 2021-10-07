import './FilterCheckbox.css'

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <div className="filter-checkbox__switch">
          <input className={`filter-checkbox__input ${props.isShort ? "filter-checkbox__input_active" : ""}`} onClick={props.changeMoviesType} name="short" id="short" type="checkbox" />
          <span className="filter-checkbox__slider"></span>
        </div>
        <p className="filter-checkbox__label">Короткометражка</p>
      </label>
    </div>
  )
}

export default FilterCheckbox;