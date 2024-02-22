import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../../images/find.svg";
function SearchForm(props) {
  function handleSearch(evt) {
    evt.preventDefault();
    console.log("search");
  }
  return (
    <section className="search-form">
      <form>
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм" required></input>
          <button
            className="search-form__submit-btn"
            type="submit"
            onClick={handleSearch}
          >
            <img src={find} alt="Аккаунт" className="search-form__icon" />
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
