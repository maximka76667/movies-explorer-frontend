import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {

  const [isSearching, setIsSearching] = React.useState(false);

  function search(e) {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000)
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={search} />
      <MoviesCardList isSearching={isSearching} />
    </main>
  )
}

export default Movies;