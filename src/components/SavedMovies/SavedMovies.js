import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function SavedMovies(props) {

  const [cardList, setCardList] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  function search(e) {
    e.preventDefault();
    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => setCardList(movies))
      .catch(console.log)
      .finally(() => setIsSearching(false))
  }

  function handleCardListChange(movies) {
    setCardList(movies);
  }

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSubmit={search} />
        <MoviesCardList isSearching={isSearching} cardList={cardList} handleCardListChange={handleCardListChange} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;