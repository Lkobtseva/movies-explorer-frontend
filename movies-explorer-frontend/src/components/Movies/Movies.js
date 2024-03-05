import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import ButtonMore from "./ButtonMore/ButtonMore";
import Preloader from "./PreLoader/PreLoader";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import useValidation from "../../hooks/useValidation";
import { useWindowWidth } from "@react-hook/window-size";

// Константы для длительности короткометражек и количества фильмов
const INITIAL_MOVIES_COUNT = 12;
const ADDITIONAL_MOVIES_COUNT = 3;

function Movies(props) {
  const {
    loggedIn,
    isMenuOpen,
    goToProfile,
    goToLogin,
    handleMenuOpen,
    onSubmitSearch,
    recentFilm,
    filteredMoviesList,
    setRecentFilm,
    filterFilms,
    addLike,
    updateMoviesWithLikes,
    isLoading,
    errorMessage,
    setErrorMessage,
  } = props;

  const { data, onChange, isFormValid, setData } = useValidation();
  const [filteredAndLimitedMoviesList, setFilteredAndLimitedMoviesList] =
    useState([]);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(
    useWindowWidth()
  );

  useEffect(() => {
    initializeData(setData);
    initializeFilteredFilms();
  }, []);

  const initializeData = (setData) => {
    setErrorMessage("");
    const filterParam = JSON.parse(localStorage.getItem("filter"));
    if (filterParam) {
      setData(filterParam);
    }
  };

  const initializeFilteredFilms = () => {
    const filterFilmsFromLocalStorage = JSON.parse(
      localStorage.getItem("filteredFilmList")
    );
    if (filterFilmsFromLocalStorage) {
      updateMoviesWithLikes(filterFilmsFromLocalStorage);
    } else if (data) {
      filterFilms();
    }
  };

  useEffect(() => {
    const max = calculateLimit();
    const newList = filteredMoviesList.slice(0, max);
    setFilteredAndLimitedMoviesList(newList);
    setRecentFilm(max);
  }, [filteredMoviesList, currentWindowWidth]);

  const calculateLimit = () => {
    if (recentFilm !== undefined) {
      return recentFilm;
    } else {
      if (currentWindowWidth >= 1280) {
        return INITIAL_MOVIES_COUNT;
      } else if (currentWindowWidth >= 768) {
        return INITIAL_MOVIES_COUNT - ADDITIONAL_MOVIES_COUNT;
      } else {
        return INITIAL_MOVIES_COUNT - 2 * ADDITIONAL_MOVIES_COUNT;
      }
    }
  };

  const handleAddMore = () => {
    const increment = currentWindowWidth >= 1280 ? ADDITIONAL_MOVIES_COUNT : 2;
    const newLimit = recentFilm + increment;
    const newList = filteredMoviesList.slice(0, newLimit);
    setFilteredAndLimitedMoviesList(newList);
    setRecentFilm(newLimit);
  };

  // изменение размера окна браузера
  useEffect(() => {
    const handleResize = () => {
      setCurrentWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BurgerMenu
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleMenuOpen}
        goToProfile={goToProfile}
      />
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleMenuOpen}
        goToProfile={goToProfile}
        goToLogin={goToLogin}
      />
      <main className="movies">
        <SearchForm
          data={data}
          isFormValid={isFormValid}
          onChange={onChange}
          onSubmitSearch={onSubmitSearch}
        />
        <span className="not-found-message">{errorMessage}</span>
        <Preloader isLoading={isLoading} />
        <MoviesCardList
          page="movies"
          addLike={addLike}
          moviesList={filteredAndLimitedMoviesList}
        />

        {filteredMoviesList.length > filteredAndLimitedMoviesList.length ? (
          <ButtonMore handleAddMore={handleAddMore} />
        ) : (
          ""
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
