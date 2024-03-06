import React, { useState, useEffect } from "react";
import useValidation from "../../../hooks/useValidation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../../images/find.svg";

function SearchForm({ onSubmitSearch }) {
  const { data, onChange, isFormValid, setIsFormValid } = useValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showShortFilms, setShowShortFilms] = useState(false);

  useEffect(() => {
    const savedFilm = localStorage.getItem("film");
    if (savedFilm) {
      onChange({ target: { name: "film", value: savedFilm } });
    }
  }, []);

  const handleInputChange = (evt) => {
    onChange(evt);
    localStorage.setItem("film", evt.target.value);
  };

  useEffect(() => {
    const shortFilm = localStorage.getItem("shortFilm");
    if (shortFilm) {
      setShowShortFilms(JSON.parse(shortFilm));
    }
  }, []);

  const handleCheckboxChange = (isChecked) => {
    setShowShortFilms(isChecked);
    localStorage.setItem("shortFilm", JSON.stringify(isChecked));
    onSubmitSearch({ ...data, shortFilm: isChecked });
  };

  const buttonSearchClassName = `search-form__submit-btn ${
    !isFormValid || errorMessage ? "search-form__submit-btn_disable" : ""
  }`;

  const handleSearch = (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);
    if (!data.film || data.film.trim() === "") {
      setErrorMessage("Нужно ввести ключевое слово");
      setIsFormValid(false);
    } else {
      setErrorMessage("");
      setIsFormValid(true);
      onSubmitSearch({ ...data, shortFilm: showShortFilms });
    }
  };

  useEffect(() => {
    if (isSubmitted && data.film) {
      setErrorMessage("");
    }
  }, [data, isSubmitted]);

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
            className={buttonSearchClassName}
            type="submit"
            disabled={!isFormValid || errorMessage}
          >
            <img src={find} alt="Поиск" className="search-form__icon" />
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
