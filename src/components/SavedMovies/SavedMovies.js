import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies(props) {

  React.useEffect(() => {
    props.initSavedMovies();
  }, [])

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="saved-movies">
        <SearchForm onSubmit={props.onSearchMyMovies} />
        <MoviesCardList
          clearCardList={props.clearCardList}
          renderedCardList={props.renderedCardList}
          isAllCardsRendered={props.isAllCardsRendered}
          countCardsOfWidth={props.countCardsOfWidth}
          setRenderedCardList={props.setRenderedCardList}
          setIsAllCardsRendered={props.setIsAllCardsRendered}
          setCountCardsOfWidth={props.setCountCardsOfWidth}
          isSearching={props.isSearching}
          isResult={props.isResult}
          cardList={props.cardList}
          isNotFound={props.isNotFound}
          onSaveMovie={props.onSaveMovie}
          onUnsaveMovie={props.onUnsaveMovie}
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;