import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {

  const [searchValue, setSearchValue] = React.useState('');
  const [isShort, setIsShort] = React.useState(false);

  function changeMoviesType() {
    setIsShort(!isShort);
  }

  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit(searchValue, isShort);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" placeholder="Фильм" name="searchValue" id="searchValue" value={searchValue} required onChange={handleSearchValueChange} />
      <button className="search-form__submit-button" type="submit">Найти</button>
      <FilterCheckbox isShort={isShort} changeMoviesType={changeMoviesType} />
      <hr className="search-form__line" />
    </form>
  )
}

export default SearchForm;