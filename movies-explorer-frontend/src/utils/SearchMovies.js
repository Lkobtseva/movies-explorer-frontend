export function isShortFilm(mins) {
  const shortFilm = mins < 40 ? true : false;
  return shortFilm;
}
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); 
  }
  //return Promise.reject(`Error: ${res.status}`); 
};

