import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function SavedMovies(props) {

  const [cardList, setCardList] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  function search(searchValue) {
    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => {
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies.filter((m) => regExp.test(m.nameRU.toLowerCase()))
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
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