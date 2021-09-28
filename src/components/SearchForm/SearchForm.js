import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {

  const [searchValue, setSearchValue] = React.useState('');

  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit(searchValue);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" placeholder="Фильм" name="searchValue" id="searchValue" value={searchValue} required onChange={handleSearchValueChange} />
      <button className="search-form__submit-button" type="submit">Найти</button>
      <FilterCheckbox />
      <hr className="search-form__line" />
    </form>
  )
}

export default SearchForm;