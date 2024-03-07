import React from 'react';

function FilterCheckbox({ onChange, isChecked }) {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    onChange(isChecked);
    localStorage.setItem("shortFilm", JSON.stringify(isChecked));
  };

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          id="check-box"
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <label htmlFor="check-box" className="filter-checkbox__label">
        Короткометражки
      </label>
    </div>
  );
}


export default FilterCheckbox;