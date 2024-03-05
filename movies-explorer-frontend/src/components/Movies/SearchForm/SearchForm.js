import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../../images/find.svg";

function SearchForm(props) {
  const { data, onChange, isFormValid, onSubmitSearch } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const buttonSearchClassName =
    `search-form__submit-btn ${!isFormValid || errorMessage ? "search-form__submit-btn_disable" : ""}`;

  function handleSearch(evt) {
    evt.preventDefault();
    setIsSubmitted(true); 
    if (!data.film || data.film.trim() === '') {
      setErrorMessage('Нужно ввести ключевое слово');
    } else {
      setErrorMessage('');
      onSubmitSearch(data);
    }
  }

  useEffect(() => {
    if (isSubmitted && data.film) {
      setErrorMessage(''); 
    }
  }, [data, isSubmitted]); 

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
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
            className={buttonSearchClassName}
            type="submit"
            disabled={!isFormValid || errorMessage}
          >
            <img src={find} alt="Поиск" className="search-form__icon" />
          </button>
        </div>
        <span className="not-found-message">{errorMessage}</span>
        <FilterCheckbox onChange={onChange} onSubmitSearch={onSubmitSearch} isFormValid={isFormValid} data={data} />
      </form>
    </section>
  );
}

export default SearchForm;
