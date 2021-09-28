import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import moviesApi from "../../utils/MoviesApi";

function Movies(props) {

  const [isSearching, setIsSearching] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);

  function search(e) {
    e.preventDefault();
    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => setCardList(movies))
      .catch(console.log)
      .finally(() => setIsSearching(false))
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSubmit={search} />
        <MoviesCardList isSearching={isSearching} cardList={cardList} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;