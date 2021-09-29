import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function SavedMovies(props) {

  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  function search(searchValue, isShort) {
    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => {
        console.log(movies);
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies
          .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
          .filter((m) => isShort ? m.duration <= 60 : m.duration > 60)
        if (filteredMovies?.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSearching(false))
  }

  // function handleCardListChange(movies) {
  //   setCardList(movies);
  // }

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSubmit={search} />
        <MoviesCardList isSearching={isSearching} cardList={cardList} isNotFound={isNotFound} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;