import React from "react";
import profileLogo from "../../../images/icon.svg";

function ProfileButton(props) {
  const { goToProfile } = props;
  return (
    <button onClick={goToProfile} className="profile-btn">
      <span className="profile-btn__text profile-btn__text_profile">
        Аккаунт
      </span>
      <img
        src={profileLogo}
        alt="Аккаунт"
        className="profile-btn__img"
      />
    </button>
  );
}

export default ProfileButton;
