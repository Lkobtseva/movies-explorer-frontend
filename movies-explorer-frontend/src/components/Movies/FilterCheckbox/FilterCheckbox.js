import React from "react";

function FilterCheckbox({ onChange, isChecked, label }) {
  const storageKey = `shortFilm_${label}`;

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    onChange(isChecked);
    localStorage.setItem(storageKey, JSON.stringify(isChecked));
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
      <label className="filter-checkbox__label" htmlFor="check-box">
        {label}
      </label>
    </div>
  );
}

export default FilterCheckbox;
