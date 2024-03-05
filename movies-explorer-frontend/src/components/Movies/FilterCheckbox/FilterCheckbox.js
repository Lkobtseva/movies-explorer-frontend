import React, { useState, useEffect } from "react";

function FilterCheckbox(props) {
  const { onChange } = props;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const shortFilm = JSON.parse(localStorage.getItem("shortFilm"));
    if (shortFilm !== null) {
      setIsChecked(shortFilm);
      onChange({ target: { name: "shortFilm", checked: shortFilm } });
    }
  }, []); 

  const handleChange = (evt) => {
    if (evt && evt.target) {
      const { checked } = evt.target;
      setIsChecked(checked);
      localStorage.setItem("shortFilm", JSON.stringify(checked));
      onChange(evt);
    } else {
      console.error("Invalid event object:", evt);
    }
  };

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          id="check-box"
          type="checkbox"
          name="shortFilm"
          checked={isChecked}
          onChange={handleChange}
          pattern=""
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
