import React from "react";

function ButtonSave(props) {
  const { handleLikeToggle } = props;
  return (
    <button
      className="btn-save movie-card__btn"
      onClick={handleLikeToggle}
    ></button>
  );
}

export default ButtonSave;
