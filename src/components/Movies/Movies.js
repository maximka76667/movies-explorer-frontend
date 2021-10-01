import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm onSubmit={props.onSearch} />
        <MoviesCardList isSearching={props.isSearching} isResult={props.isResult} isNotFound={props.isNotFound} cardList={props.cardList} onSaveMovie={props.onSaveMovie} onUnsaveMovie={props.onUnsaveMovie} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;