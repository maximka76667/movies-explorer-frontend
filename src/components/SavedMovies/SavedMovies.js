import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="saved-movies">
        <SearchForm onSubmit={props.onSearch} />
        <MoviesCardList isSearching={props.isSearching} isResult={props.isResult} cardList={props.cardList} isNotFound={props.isNotFound} onSaveMovie={props.onSaveMovie} onUnsaveMovie={props.onUnsaveMovie} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;