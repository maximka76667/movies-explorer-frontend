import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSubmit={props.handleSearch} />
        <MoviesCardList isSearching={props.isSearching} isNotFound={props.isNotFound} cardList={props.cardList} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;