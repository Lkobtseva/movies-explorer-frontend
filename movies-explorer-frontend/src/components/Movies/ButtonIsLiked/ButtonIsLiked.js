import React from "react";

function ButtonIsLiked(props) {
  const { handleLikeToggle } = props;
  return (
    <button
      className="btn-liked movie-card__btn"
      onClick={handleLikeToggle}
    />
  );
}

export default ButtonIsLiked;
