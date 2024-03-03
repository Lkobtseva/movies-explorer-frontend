import React, { useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    data,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid,
    setData
  } = useValidation();
  const {
    loggedIn,
    isMenuOpen,
    handleMenuOpen,
    goToProfile,
    goToLogin,
    signOut,
    errorMessage,
    setErrorMessage,
    onSubmitUserInfo,
  } = props;

  useEffect(() => {
    resetValidation({ name: currentUser.name, email: currentUser.email });
    //setData({ name: "", email: "" });
    setIsFormValid(false);
  }, [currentUser, resetValidation, setData, setIsFormValid]);

  useEffect(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

  function updateUserInfo(evt) {
    evt.preventDefault();
    onSubmitUserInfo({ name: data.name, email: data.email });
    //setIsFormValid(false);
    resetValidation();
  }

  function handleProfileChange(evt) {
    onChange(evt);
    const { name, value } = evt.target;
    setData((prevData) => {
      const newData = { ...prevData, [name]: value };
      setIsFormValid(!isSameUserData(newData, currentUser));
      return newData;
    });
  }

  function isSameUserData(data, user) {
    return data.name === user.name && data.email === user.email;
  }

  const buttonSubmitClassName = `profile__btn ${isFormValid ? "" : "profile__btn_disable"}`;

  return (
    <>
      <BurgerMenu
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleMenuOpen}
        goToProfile={goToProfile}
      />
      <Header
        loggedIn={loggedIn}
        isMenuOpen={isMenuOpen}
        handleMenuOpen={handleMenuOpen}
        goToProfile={goToProfile}
        goToLogin={goToLogin}
      />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={updateUserInfo}>
          <label htmlFor="profile-name" className="profile__label">
            <span className="profile__container">
              <span className="profile__span">Имя</span>
              <input
                placeholder="Введите имя"
                className="profile__input"
                id="profile-name"
                name="name"
                type="text"
                onChange={handleProfileChange}
                value={data.name || ""}
                required
                minLength={2}
                maxLength={30}
              />
            </span>
            <span className="profile__input-error">{errors.name}</span>
          </label>
          <label htmlFor="profile-email" className="profile__label">
            <span className="profile__container">
              <span className="profile__span">E-mail</span>
              <input
                placeholder="Введите почту"
                className="profile__input"
                id="profile-email"
                name="email"
                type="text"
                onChange={handleProfileChange}
                value={data.email || ""}
                required
              />
            </span>
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <span className="profile__input-error">{errorMessage} </span>
          <button className={buttonSubmitClassName} disabled={!isFormValid}>
            Редактировать
          </button>
        </form>
        <button className="profile__btn profile__btn_logout" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}

export default Profile;
