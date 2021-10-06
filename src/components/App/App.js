import React from 'react';
import './App.css';
import Main from '../Main/Main'
import { Route, withRouter, Switch } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext'
import auth from '../../utils/Auth'
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useLocation } from 'react-router'

function App(props) {

  const location = useLocation();

  // Auth
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Loading
  const [isLoading, setIsLoading] = React.useState(false);

  // CardList
  const [initSavedCardList, setInitSavedCardList] = React.useState([]);
  const [initCardList, setInitCardList] = React.useState([]);

  // Movies
  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);

  // Saved Movies
  const [savedMovies, setSavedMovies] = React.useState([]);

  // Profile
  const [isEdit, setIsEdit] = React.useState(false);

  // InfoTooltip
  const [resultSuccessful, setResultSuccessful] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');

  // Auth
  function handleLogin({ email, password }) {
    auth.login({ email, password })
      .then((data) => {
        if (data.token) handleAuth(data.token);
      })
      .catch(err => handleError(err));
  }

  function handleAuth(token) {
    const requestedPathname = location.pathname;
    auth.getEmail(token)
      .then((res) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        setInfoMessage('Авторизация прошла успешно.');
        setResultSuccessful(true);
        setIsInfoTooltipOpen(true);
        mainApi.changeToken(token);
        setCurrentUser(res.user);
        if (requestedPathname === '/signin' || requestedPathname === '/signup') props.history.push('/movies')
        else props.history.push(requestedPathname);
        mainApi.getSavedMovies()
          .then((movies) => {
            const filteredMovies = movies.movies.filter((movie) => movie.owner === res.user._id);
            setSavedMovies(filteredMovies);
          })
      })
      .catch(err => handleError(err));
  }

  function handleLogout() {
    auth.signout(localStorage.getItem('token'))
      .then(() => {
        setLoggedIn(false);
        mainApi.changeToken('');
        setCurrentUser(null);
        localStorage.removeItem('token');
        props.history.push('/');
        setInfoMessage('Выход из аккаунта прошел успешно.');
        setResultSuccessful(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => handleError(err))
  }

  function handleRegister({ name, email, password }) {
    auth.register({ name, email, password })
      .then((res) => {
        setInfoMessage('Регистрация прошла успешно.');
        setResultSuccessful(true);
        setIsInfoTooltipOpen(true);
        handleLogin({ email, password });
      })
      .catch((err) => handleError(err))
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return handleAuth(token);
    }
  }

  // CardList
  function clearCardList() {
    setIsResult(false);
  }

  // Movies
  function handleSearchAllMovies(searchValue, isShort) {
    setIsResult(false);
    if (!searchValue) {
      setResultSuccessful(false);
      setIsInfoTooltipOpen(true);
      setInfoMessage('Заполните поле поиска.');
    }
    const regExp = new RegExp(searchValue.toLowerCase());
    const filteredMovies = initCardList
      .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
      .filter((m) => isShort ? m.duration <= 40 : m.duration > 40)
    if (filteredMovies?.length === 0) return setIsNotFound(true);
    setCardList(filteredMovies);
    setIsNotFound(false);
    setIsResult(true);
  }

  // Saved Movies
  function handleInitSavedMovies() {
    setIsNotFound(false);
    setIsResult(true);
    setInitSavedCardList(savedMovies);
    setCardList(savedMovies);
  }

  // Movie Card
  function handleSaveMovie(data) {
    mainApi.saveMovie(data)
      .then((movie) => setSavedMovies([movie.movie, ...savedMovies]))
      .catch((err) => handleError(err))
  }

  function handleUnsaveMovie(id) {
    mainApi.unsaveMovie(id)
      .then((deletedCard) => {
        const newSavedMovies = savedMovies.filter((movieCard) => deletedCard.movie._id !== movieCard._id)
        setSavedMovies(newSavedMovies);
      })
      .catch(err => console.log(err))
  }

  function handleSearchMyMovies(searchValue, isShort) {
    if (initSavedCardList.length === 0) return setIsNotFound(true);
    const regExp = new RegExp(searchValue.toLowerCase());
    const filteredMovies = initSavedCardList
      .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
      .filter((m) => isShort ? m.duration <= 40 : m.duration > 40)
    if (filteredMovies.length === 0) return setIsNotFound(true);
    setIsNotFound(false);
    setCardList(filteredMovies);
  }

  // Profile
  function handleUpdateUser({ name, email }) {
    if (isEdit) {
      setIsLoading(true);
      mainApi.setProfileInfo({ name, email })
        .then((res) => {
          setCurrentUser(res.user);
          setInfoMessage('Информация профиля успешно изменена.');
          setResultSuccessful(true);
          setIsInfoTooltipOpen(true);
        })
        .catch((err) => {
          setCurrentUser(currentUser);
          handleError(err)
        })
        .finally(() => {
          setIsLoading(false);
          setIsEdit(false);
        })
    }
  }

  function changeIsEdit(newIsEdit) {
    setIsEdit(newIsEdit);
  }

  // Others
  function handleError(error) {
    console.log(error);
    setInfoMessage('Что-то пошло не так! Попробуйте ещё раз.');
    setResultSuccessful(false);
    setIsInfoTooltipOpen(true);
  }

  function handleCloseAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    handleTokenCheck();

    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => {
        setInitCardList(movies);
      })
      .catch((err) => handleError(err))
      .finally(() => setIsSearching(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup" exact>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin" exact>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/" exact>
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path="/profile"
            exact
            component={Profile}
            loggedIn={loggedIn}
            onUserUpdate={handleUpdateUser}
            onLogout={handleLogout}
            isLoading={isLoading}
            changeIsEdit={changeIsEdit}
            isEdit={isEdit}
          />
          <ProtectedRoute
            path="/movies"
            exact
            component={Movies}
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSearch={handleSearchAllMovies}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
            savedMovies={savedMovies}
            clearCardList={clearCardList}
          />
          <ProtectedRoute
            path="/saved-movies"
            exact
            component={SavedMovies}
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
            savedMovies={savedMovies}
            initSavedMovies={handleInitSavedMovies}
            clearCardList={clearCardList}
            onSearchMyMovies={handleSearchMyMovies}
          />
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          result={resultSuccessful}
          onClose={handleCloseAllPopups}
          message={infoMessage}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
