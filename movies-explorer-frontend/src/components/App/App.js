import React, {useState, useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PageNotFound from "../PageNotFound/PageNotFound";
import { getMoviesList } from "../../utils/MoviesApi";
import {
  logInUser,
  signUpUser,
  checkToken,
  fetchUserData,
  updateUserData,
  fetchSavedMovies,
  saveMovie,
  removeSavedMovie,
} from "../../utils/MainApi";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [recentFilm, setRecentFilm] = useState(undefined);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/signin");
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  function goToProfile() {
    navigate("/profile");
    handleMenuOpen();
  }

  async function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      setLoggedIn(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await checkToken(jwt);
      setCurrentUser(res);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      setLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    tokenCheck();
  }, []);

  function addLike(movie, isLiked, setIsLiked) {
    const jwt = localStorage.getItem("token");

    if (!jwt) {
      setLoggedIn(false);
      return;
    }

    if (isLiked) {
      removeSavedMovie(movie._id, jwt)
        .then(() => {
          setIsLiked(false);
          setSavedMoviesList(
            savedMoviesList.filter((elem) => elem._id !== movie._id)
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      saveMovie(movie, jwt)
        .then((res) => {
          setIsLiked(true);
          setSavedMoviesList([...savedMoviesList, res]);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  function getSaved(filters) {
    const jwt = localStorage.getItem("token");
    if (!loggedIn || !jwt) {
      return;
    }

    setIsLoading(true);

    fetchSavedMovies(jwt)
      .then((res) => {
        let filteredMovies = res;
        if (filters) {
          const { film, shortFilm } = filters;
          const lowercaseFilm = film.toLowerCase();

          filteredMovies = res.filter((movie) =>
            movie.nameRU.toLowerCase().includes(lowercaseFilm)
          );

          if (shortFilm) {
            filteredMovies = filteredMovies.filter(
              (movie) => movie.duration <= 40
            );
          } else {
            filteredMovies = filteredMovies.filter(
              (movie) => movie.duration > 40
            );
          }
        }
        setSavedMoviesList(filteredMovies);
      })
      .catch((err) => setErrorMessage(err))
      .finally(() => setIsLoading(false));
  }

  async function updateMoviesWithLikes(moviesList) {
    const jwt = localStorage.getItem("token");
    if (!loggedIn || !jwt) {
      return moviesList;
    }

    setIsLoading(true);

    try {
      const savedMovies = await fetchSavedMovies(jwt);
      const savedMoviesIndex = {};
      savedMovies.forEach((elem) => {
        savedMoviesIndex[elem.movieId] = elem._id;
      });

      const updatedMoviesList = moviesList.map((movie) => {
        if (savedMoviesIndex[movie.id] !== undefined) {
          return { ...movie, _id: savedMoviesIndex[movie.id] };
        }
        return movie;
      });

      setFilteredMoviesList(updatedMoviesList);

      return updatedMoviesList;
    } catch (err) {
      setErrorMessage(err);
      return moviesList;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMovieList() {
    let moviesList = JSON.parse(localStorage.getItem("moviesList"));

    if (!moviesList) {
      try {
        moviesList = await getMoviesList();
        localStorage.setItem("moviesList", JSON.stringify(moviesList));
      } catch (err) {
        console.error("Ошибка при загрузке списка фильмов:", err);
        throw err;
      }
    }

    return moviesList;
  }

  function handleLogin(data, timeout) {
    return new Promise((resolve, reject) => {
      let jwt;
      logInUser(data)
        .then(() => {
          jwt = localStorage.getItem("token");
          console.log("token", jwt);
          if (!jwt) {
            throw new Error("Токен не найден в локальном хранилище");
          }
          return fetchUserData(jwt);
        })
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          if (timeout) {
            setTimeout(() => {
              navigate("/movies");
              resolve();
            }, timeout);
          } else {
            navigate("/movies");
            resolve();
          }
        })
        .catch((error) => {
          if (typeof error === "object" && "message" in error) {
            setErrorMessage(error.message);
          } else {
            error.then((e) => setErrorMessage(e.message));
          }
          setLoggedIn(false);
          reject(error);
        });
    });
  }

  function handleRegister(data) {
    return new Promise((resolve, reject) => {
      signUpUser(data)
        .then(() => {
          setErrorMessage(
            "Регистрация прошла успешно. Вы будете перенаправлены на другую страницу"
          );
          return handleLogin(data, 1500).then(resolve).catch(reject);
        })
        .catch((err) => {
          err.then((e) => {
            setErrorMessage(e.message);
          });
          reject(err);
        });
    });
  }

  function onSubmitUserInfo(data) {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem("token");
      updateUserData(data, jwt)
        .then((res) => {
          setErrorMessage("Данные успешно изменены");
          setCurrentUser(res);
          resolve();
        })
        .catch((err) => {
          setErrorMessage(err.message);
          reject(err);
        });
    });
  }

  function applyFilter(movies, filterParam, savedMovies) {
    const { film, shortFilm = false } = filterParam;

    let filteredMovies = movies.filter((elem) =>
      elem.nameRU.toLowerCase().includes(film.toLowerCase())
    );

    if (shortFilm) {
      filteredMovies = filteredMovies.filter((elem) => elem.duration <= 40);
    } else {
      filteredMovies = filteredMovies.filter((elem) => elem.duration > 40);
    }

    const savedMoviesIndex = savedMovies.reduce((acc, elem) => {
      acc[elem.movieId] = elem._id;
      return acc;
    }, {});

    filteredMovies = filteredMovies.map((movie) => {
      const savedMovieId = savedMoviesIndex[movie.id];
      return savedMovieId ? { ...movie, _id: savedMovieId } : movie;
    });

    return filteredMovies;
  }

  function filterFilms() {
    setErrorMessage("");
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setIsLoading(true);
      const filterParam = JSON.parse(localStorage.getItem("filter"));

      Promise.all([loadMovieList(), fetchSavedMovies(jwt)])
        .then((promiseResult) => {
          const [movies, savedMovies] = promiseResult;

          if (filterParam) {
            const filterMovies = applyFilter(
              movies,
              filterParam,
              savedMovies
            );

            if (filterMovies.length === 0) {
              setErrorMessage("Ничего не найдено");
            }

            setFilteredMoviesList(filterMovies);
          } else {
            localStorage.removeItem("filteredFilmList");
            setFilteredMoviesList([]);
          }
          setRecentFilm(undefined);
        })
        .catch((err) =>
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          )
        )
        .finally(() => setIsLoading(false));
    }
  }

  function onSubmitSearch(data) {
    localStorage.setItem("filter", JSON.stringify(data));
    filterFilms();
  }

  function onSubmitSaveSearch(data) {
    getSaved(data);
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("filter");
    localStorage.removeItem("moviesList");
    localStorage.removeItem("filteredFilmList");

    setFilteredMoviesList([]);
    setCurrentUser({});
    setLoggedIn(false);

    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              loggedIn={loggedIn}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
            loggedIn={loggedIn}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              loggedIn={loggedIn}
              handleRegister={handleRegister}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              isMenuOpen={isMenuOpen}
              currentUser={currentUser}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              handleMenuOpen={handleMenuOpen}
              onSubmitUserInfo={onSubmitUserInfo}
              signOut={signOut}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              isLoading={isLoading}
              loggedIn={loggedIn}
              isMenuOpen={isMenuOpen}
              errorMessage={errorMessage}
              recentFilm={recentFilm}
              setErrorMessage={setErrorMessage}
              handleMenuOpen={handleMenuOpen}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              onSubmitSearch={onSubmitSearch}
              filteredMoviesList={filteredMoviesList}
              filterFilms={filterFilms}
              setRecentFilm={setRecentFilm}
              addLike={addLike}
              updateMoviesWithLikes={updateMoviesWithLikes}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={SavedMovies}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              loggedIn={loggedIn}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
              savedMoviesList={savedMoviesList}
              onSubmitSaveSearch={onSubmitSaveSearch}
              addLike={addLike}
              getSaved={getSaved}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
