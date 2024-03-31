import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Movies/PreLoader/PreLoader";
import useValidation from "../../hooks/useValidation";

function SavedMovies(props) {
  const { data, onChange, isFormValid } = useValidation();

  const {
    isLoading,
    loggedIn,
    setErrorMessage,
    goToProfile,
    goToLogin,
    isMenuOpen,
    handleMenuOpen,
    addLike,
    savedMoviesList,
    onSubmitSaveSearch,
    getSaved,
  } = props;

  useEffect(() => {
    getSaved();
    setErrorMessage("");
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
      <main className="saved-movies">
        <SearchForm
          data={data}
          onChange={onChange}
          onSubmitSearch={onSubmitSaveSearch}
          isFormValid={isFormValid}
        />
        {savedMoviesList.length === 0 && (
          <span className="not-found-message">У вас пока нет сохраненных фильмов</span>
        )}
        <Preloader isLoading={isLoading} />
        {savedMoviesList.length > 0 && (
          <MoviesCardList
            page="saved-movies"
            moviesList={savedMoviesList} 
            addLike={addLike}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
