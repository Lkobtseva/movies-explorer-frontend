export function checkShortFilm(mins) {
  const shortFilm = mins < 40 ? true : false;
  return shortFilm;
}
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};
// const movies = [{movieId: 25, nameRU: "name1"}, {movieId: 98, nameRU: "name2"}, {movieId: 346, nameRU: "name3"}];
// const moviesIndex = {};
//  movies.forEach((el)=> {
//   moviesIndex[el.movieId] = el;
//  })
//  console.log(moviesIndex);
