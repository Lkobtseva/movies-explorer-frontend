import React, { useState, useEffect } from "react";
import useValidation from "../../../hooks/useValidation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../../images/find.svg";

function SearchForm({ onSubmitSearch  }) {
  const { data, onChange, isFormValid, setIsFormValid } = useValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showShortFilms, setShowShortFilms] = useState(false);

  useEffect(() => {
    const savedFilm = localStorage.getItem("film_" + window.location.pathname);
    if (savedFilm) {
      onChange({ target: { name: "film", value: savedFilm } });
    }
  }, []);

  useEffect(() => {
    const savedShortFilm = localStorage.getItem("shortFilm_" + window.location.pathname);
    if (savedShortFilm) {
      setShowShortFilms(JSON.parse(savedShortFilm));
    }
  }, []);

  const handleInputChange = (evt) => {
    onChange(evt);
    localStorage.setItem("film_" + '/movies', evt.target.value);
    setIsFormValid(evt.target.value.trim() !== "");
  };

  const handleCheckboxChange = (isChecked) => {
    setShowShortFilms(isChecked);
    localStorage.setItem("shortFilm_" + '/movies', JSON.stringify(isChecked));
    onSubmitSearch({ ...data, shortFilm: isChecked });
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!data.film || data.film.trim() === "") {
      setErrorMessage("Нужно ввести ключевое слово");
    } else {
      setErrorMessage(""); 
      onSubmitSearch({ ...data, shortFilm: showShortFilms });
    }
  };

  return (
    <section className="search-form">
      <form onSubmit={handleSearch}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            name="film"
            value={data.film || ""}
            placeholder="Фильм"
            onChange={handleInputChange}
          />
          <button
            className={`search-form__submit-btn ${
              !isFormValid ? "search-form__submit-btn_disable" : ""
            }`}
            type="submit"
          >
            <img
              src={find}
              alt="Поиск"
              className="search-form__icon"
            />
          </button>
        </div>
        <span className="not-found-message">{errorMessage}</span>
        <FilterCheckbox
          label="Короткометражки"
          onChange={handleCheckboxChange}
          isChecked={showShortFilms}
        />
      </form>
    </section>
  );
}

export default SearchForm;