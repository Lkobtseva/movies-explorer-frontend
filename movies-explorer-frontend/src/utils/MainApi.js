const API_BASE_URL = "https://api.likobtseva.nomoredomainsmonster.ru";

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(res.json());
  }
  return res.json();
}
export function checkToken(jwt) {
  return fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => handleResponse(res));
}
export function signUpUser(userData) {
  return fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }),
  }).then((res) => handleResponse(res));
}

export function logInUser(credentials) {
  return fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })
    .then((res) => handleResponse(res))
    .then((res) => {
      localStorage.setItem("token", res.token);
    });
}

export function fetchUserData(jwt) {
  return fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => handleResponse(res));
}

export function updateUserData(userData, jwt) {
  return fetch(`${API_BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name: userData.name, email: userData.email }),
  }).then((res) => handleResponse(res));
}

export function fetchSavedMovies(jwt) {
  return fetch(`${API_BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => handleResponse(res));
}

export function saveMovie(movieData, jwt) {
  return fetch(`${API_BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      country: movieData.country,
      director: movieData.director,
      duration: movieData.duration,
      year: movieData.year,
      description: movieData.description,
      image: `https://api.nomoreparties.co${movieData.image.url}`,
      trailerLink: movieData.trailerLink,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
      thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
      movieId: movieData.id,
    }),
  }).then((res) => handleResponse(res));
}

export function removeSavedMovie(movieId, jwt) {
  return fetch(`${API_BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => handleResponse(res))
    .catch((error) => console.error("Error deleting movie:", error));
}
