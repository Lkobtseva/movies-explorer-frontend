import React from "react";
import { useLocation } from "react-router-dom";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderNavLogin from "./HeaderNavLogin/HeaderNavLogin";
import HeaderNavLogout from "./HeaderNavLogout/HeaderNavLogout";

function Header(props) {
  const {
    loggedIn,
    isMenuOpen,
    handleMenuOpen,
    goToProfile,
    goToLogin,
    margin,
  } = props;
  const location = useLocation();
  const headerClassName = ` ${
    location.pathname === "/" ? "header--main" : "header"
  }`;

  return (
    <header className={headerClassName}>
      <HeaderLogo />
      {loggedIn ? (
        <HeaderNavLogin
          goToProfile={goToProfile}
          isMenuOpen={isMenuOpen}
          handleMenuOpen={handleMenuOpen}
        />
      ) : (
        <HeaderNavLogout goToLogin={goToLogin} />
      )}
    </header>
  );
}

export default Header;
