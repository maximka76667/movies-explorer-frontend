import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function Movies(props) {

  const [isSearching, setIsSearching] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);

  function search(searchValue) {
    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => {
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies.filter((m) => regExp.test(m.nameRU.toLowerCase()))
        if (filteredMovies.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSearching(false))
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSubmit={search} />
        <MoviesCardList isSearching={isSearching} isNotFound={isNotFound} cardList={cardList} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;