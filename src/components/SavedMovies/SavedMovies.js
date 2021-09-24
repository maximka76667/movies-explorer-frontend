import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSubmit={search} />
        <MoviesCardList isSearching={isSearching} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;