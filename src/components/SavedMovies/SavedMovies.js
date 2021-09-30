import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  // function handleCardListChange(movies) {
  //   setCardList(movies);
  // }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="saved-movies">
        <SearchForm onSubmit={props.onSearch} />
        <MoviesCardList isSearching={props.isSearching} isResult={props.isResult} cardList={props.cardList} isNotFound={props.isNotFound} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;