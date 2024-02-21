import React from "react";

function ButtonSave(props) {
  const { handleClickLikedToggle } = props;
  return (
    <button
      className="btn-save movie-card__btn"
      onClick={handleClickLikedToggle}
    ></button>
  );
}

export default ButtonSave;
