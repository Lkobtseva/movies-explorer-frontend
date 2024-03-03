import React, {useEffect, useState} from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../../images/find.svg";

function SearchForm(props) {
  const { data, onChange, isFormValid, onSubmitSearch } = props;
  const [errorMessage, setErrorMessage] = useState(''); 

    const buttonSearchClassName =
    `search-form__submit-btn ${!isFormValid || errorMessage ? "search-form__submit-btn_disable" : ""}`;

  function handleSearch(evt) {
    evt.preventDefault();
    if (data.film.trim() === '') {
      setErrorMessage('Нужно ввести ключевое слово');
    } else {
      setErrorMessage(''); 
      onSubmitSearch(data);
    }
  }

  useEffect(() => {
    if (data.film) {
      onSubmitSearch(data);
    }
  }, [data.shortFilm]);

  return (
    <section className="search-form">
      <form onSubmit={handleSearch}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            name="film"
            value={data.film || ""}
            placeholder="Фильм"
            onChange={onChange}
            
          ></input>
          <button
              className={buttonSearchClassName}
              type="submit"
              disabled={!isFormValid}
          >
            <img src={find} alt="Поиск" className="search-form__icon" />
          </button>
        </div>
        <FilterCheckbox onChange={onChange} onSubmitSearch={onSubmitSearch} isFormValid={isFormValid} data={data}/>
      </form>
    </section>
  );
}

export default SearchForm;
