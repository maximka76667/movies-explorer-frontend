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
      <Header />
      <main className="saved-movies">
        <SearchForm onSubmit={props.handleSearch} />
        <MoviesCardList isSearching={props.isSearching} cardList={props.cardList} isNotFound={props.isNotFound} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;