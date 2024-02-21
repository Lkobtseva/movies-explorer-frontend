import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  const navigate = useNavigate();
  function goToProfile() {
    navigate("/profile");
  }
  function goToLogin() {
    navigate("/signin");
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main loggedIn={false} goToLogin={goToLogin} margin={true} />
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/profile"
          element={
            <Profile
              loggedIn={true}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              margin={false}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              loggedIn={true}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              margin={false}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              loggedIn={true}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
              goToProfile={goToProfile}
              goToLogin={goToLogin}
              margin={false}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
