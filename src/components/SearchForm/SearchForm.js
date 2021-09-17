import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className="search-form">
      <input className="search-form__input" placeholder="Фильм" />
      <button className="search-form__submit-button" type="submit">Найти</button>
      <FilterCheckbox />
      <hr className="search-form__line" />
    </form>
  )
}

export default SearchForm;