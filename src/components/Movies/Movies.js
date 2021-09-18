import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}

export default Movies;