import './FilterCheckbox.css'

function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <label class="filter-checkbox__switch">
        <input className="filter-checkbox__input" name="short" id="short" type="checkbox" />
        <span class="filter-checkbox__slider"></span>
      </label>
      <label className="filter-checkbox__label" for="short" >Короткометражка</label>
    </div>
  )
}

export default FilterCheckbox;