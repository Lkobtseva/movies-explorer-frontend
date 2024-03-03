import React, { useState, useEffect } from "react";
import ButtonSave from "../ButtonSave/ButtonSave";
import ButtonIsLiked from "../ButtonIsLiked/ButtonIsLiked";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

function MoviesCard(props) {
  const { page, movie, nameRU, imageUrl, trailerLink, duration, liked, addLike } = props;
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeToggle = () => {
    addLike(movie, isLiked, setIsLiked);
  };

  const updateIsLiked = () => {
    if (movie) {
      setIsLiked(!!movie._id);
    } else {
      setIsLiked(false);
    }
  };

  const getMovieDuration = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    return `${hours ? `${hours}ч ` : ''}${minutes}м`;
  };

  let button;
  if (page === "saved-movies") {
    button = <ButtonDelete handleLikeToggle={handleLikeToggle} />;
  } else if (page === "movies" && isLiked) {
    button = <ButtonIsLiked handleLikeToggle={handleLikeToggle} />;
  } else if (page === "movies" && !isLiked) {
    button = <ButtonSave handleLikeToggle={handleLikeToggle} />;
  }

  useEffect(() => {
    updateIsLiked();
  }, [movie]);

  return (
    <article className="movie-card">
        {button}
      <figure className="movie-card__figure">
        <a href={trailerLink} className="movie-card__link">
        <img
            className="movie-card__image"
            src={
                page === "saved-movies"
                ? imageUrl
                : `https://api.nomoreparties.co/${imageUrl}`
             }
             alt="Кадр фильма"
        />
        </a>
        <figcaption className="movie-card__figcaption">
          <p className="movie-card__title">{nameRU}</p>
          <p className="movie-card__duration">{getMovieDuration(duration)}</p>
        </figcaption>
      </figure>
    </article>
  );
}

export default MoviesCard;
