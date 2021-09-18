import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies(props) {

  const [isSearching, setIsSearching] = React.useState(false);

  function search(e) {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000)
  }
  return (
    <div className="saved-movies">
      <SearchForm onSubmit={search} />
      <MoviesCardList isSearching={isSearching} />
    </div>
  )
}

export default SavedMovies;