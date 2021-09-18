import './FilterCheckbox.css'

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <div class="filter-checkbox__switch">
          <input className="filter-checkbox__input" name="short" id="short" type="checkbox" />
          <span class="filter-checkbox__slider"></span>
        </div>
        <p className="filter-checkbox__label">Короткометражка</p>
      </label>
    </div>
  )
}

export default FilterCheckbox;