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

function App(props) {
  // Auth
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Loading
  const [isLoading, setIsLoading] = React.useState(false);

  // CardList
  const [initCardList, setInitCardList] = React.useState([]);
  const [renderedCardList, setRenderedCardList] = React.useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = React.useState(false);
  const [countCardsOfWidth, setCountCardsOfWidth] = React.useState(0);

  // Movies
  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);

  // Saved Movies
  const [savedMovies, setSavedMovies] = React.useState([]);

  // Profile
  const [isEdit, setIsEdit] = React.useState(false);

  // Auth
  function handleLogin({ email, password }) {
    auth.login({ email, password })
      .then((data) => {
        if (data.token) handleAuth(data.token);
      })
      .catch(err => handleError(err));
  }

  function handleAuth(token) {
    auth.getEmail(token)
      .then((res) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        //setLoginResult(true);
        //setIsInfoTooltipOpen(true);
        mainApi.changeToken(token);
        setCurrentUser(res.user);
        props.history.push('/movies');
        mainApi.getSavedMovies()
          .then((movies) => {
            const filteredMovies = movies.movies.filter((movie) => {
              console.log(movie.owner, res.user._id, res.user);
              return movie.owner === res.user._id
            });
            console.log(filteredMovies);
            setSavedMovies(filteredMovies);
          })
      })
      .catch(err => handleError(err));
  }

  function handleLogout() {
    auth.signout()
      .then(() => {
        setLoggedIn(false);
        mainApi.changeToken('');
        setCurrentUser(null);
        localStorage.removeItem('token');
        props.history.push('/signin');
      })
      .catch((err) => handleError(err))
  }

  function handleRegister({ name, email, password }) {
    auth.register({ name, email, password })
      .then(() => {
        //setLoginResult(true);
        //setIsInfoTooltipOpen(true);
        props.history.push('/signin');
      })
      .catch((err) => handleError(err))
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return handleAuth(token);
    }
  }

  React.useEffect(() => {
    handleTokenCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // CardList
  function clearCardList() {
    setIsResult(false);
    setIsAllCardsRendered(true);
    setRenderedCardList([]);
  }

  // Movies
  function handleSearchAllMovies(searchValue, isShort) {
    setIsSearching(true);
    setIsResult(false);
    moviesApi.getMovies()
      .then(movies => {
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies
          .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
          .filter((m) => isShort ? m.duration <= 40 : m.duration > 40)
        if (filteredMovies?.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setIsResult(true);
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSearching(false))
  }

  // Saved Movies
  function handleInitSavedMovies() {
    setIsNotFound(false);
    setIsResult(true);
    setInitCardList(savedMovies);
    setCardList(savedMovies);
  }

  // Movie Card
  function handleSaveMovie(data) {
    console.log(data);
    mainApi.saveMovie(data)
      // .then((movie) => {
      //   setSavedMovies({ ...savedMovies, movie });
      // })
      .catch((err) => handleError(err))
  }

  function handleUnsaveMovie(id) {
    mainApi.unsaveMovie(id)
      .catch(err => handleError(err))
  }

  function handleSearchMyMovies(searchValue, isShort) {
    // setIsSearching(true);
    // setIsResult(false);
    // mainApi.getSavedMovies()
    //   .then(({ movies }) => {
    //     console.log(searchValue, isShort);
    //     console.log(movies);
    //     if (movies.length === 0) return setIsNotFound(true);
    //     const regExp = new RegExp(searchValue.toLowerCase());
    //     const filteredMovies = movies
    //       .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
    //       .filter((m) => isShort ? m.duration <= 60 : m.duration > 60)
    //     if (filteredMovies.length === 0) return setIsNotFound(true);
    //     setIsNotFound(false);
    //     setIsResult(true);
    //     setCardList(filteredMovies);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setIsSearching(false))
    console.log(initCardList);
    if (initCardList.length === 0) return setIsNotFound(true);
    const regExp = new RegExp(searchValue.toLowerCase());
    const filteredMovies = initCardList
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
        })
        .catch((err) => handleError(err))
        .finally(() => {
          setIsLoading(false);
          setIsEdit(false);
        })
    }
  }

  function handleError(error) {
    console.log(error);
  }

  // const renderCards = (countCardsOfWidth, renderedCards) => {
  //   const cardsForRender = [];

  //   console.log(cardList, 'cardList');

  //   const countCardsForRender = location.pathname === "/saved-movies" ? cardList.length : countCardsOfWidth;

  //   for (let i = 0; i < countCardsForRender; i++) {
  //     const newCardIndex = i + renderedCards.length;
  //     const newCard = cardList?.[newCardIndex] || 0;

  //     if (newCardIndex >= cardList?.length - 1) {
  //       if (newCardIndex === cardList?.length - 1) {
  //         cardsForRender.push(newCard);
  //       }
  //       setIsAllCardsRendered(true);
  //       break;
  //     }

  //     cardsForRender.push(newCard);
  //   }

  //   setRenderedCardList([...renderedCards, ...cardsForRender]);
  // }

  function checkCountOfCards() {
    const width = window.innerWidth;

    if (width > 800) {
      setCountCardsOfWidth(3);
    }

    if (width > 650 && width <= 800) {
      setCountCardsOfWidth(2);
    }

    if (width <= 650) {
      setCountCardsOfWidth(1);
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', (e) => {
      checkCountOfCards();
    })

    checkCountOfCards();
    //renderCards(countCardsOfWidth, renderedCardList);

    // eslint-disable-next-line
  }, []);

  //React.useEffect(() => {
  //clearCardList();
  //renderCards(countCardsOfWidth, []);
  // eslint-disable-next-line
  //}, [countCardsOfWidth]);

  //React.useEffect(() => {
  //clearCardList();
  //renderCards(countCardsOfWidth, []);
  // eslint-disable-next-line
  //}, [cardList])

  // React.useEffect(() => {
  //   if (isNotFound) {
  //     setIsAllCardsRendered(true);
  //   }
  // }, [isNotFound])

  // React.useEffect(() => {
  //   renderCards(countCardsOfWidth, []);
  //   if (cardList.length === 0) {
  //     setIsAllCardsRendered(true);
  //   }
  // }, [cardList])

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
            renderedCardList={renderedCardList}
            isAllCardsRendered={isAllCardsRendered}
            countCardsOfWidth={countCardsOfWidth}
            setRenderedCardList={setRenderedCardList}
            setIsAllCardsRendered={setIsAllCardsRendered}
            setCountCardsOfWidth={setCountCardsOfWidth}
            onSearchMyMovies={handleSearchMyMovies}
          />
          <ProtectedRoute path="/" component={NotFound} />
        </Switch>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
