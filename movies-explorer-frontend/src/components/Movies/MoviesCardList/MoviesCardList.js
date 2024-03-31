import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { page, moviesList, addLike } = props;

  function getKey(page, movie) {
    if (page === "saved-movies") {
      return movie._id;
    } else if (movie.id !== undefined) {
      return movie.id;
    } else {
      return movie.key;
    }
  }
  function getImageUrl(page, movie) {
    return page === "saved-movies" ? movie.image : movie.image.url;
  }

  return (
    <>
      <section className="movies-card-list">
        {moviesList.map((movie) => {
          const liked =
            page === "saved-movies" ||
            (page === "movies" && movie._id !== undefined);

          return (
            <MoviesCard
              page={page}
              key={getKey(page, movie)}
              movie={movie}
              nameRU={movie.nameRU}
              imageUrl={getImageUrl(page, movie)}
              trailerLink={movie.trailerLink}
              duration={movie.duration}
              addLike={addLike}
              liked={liked}
            />
          );
        })}
      </section>
    </>
  );
}

export default MoviesCardList;
