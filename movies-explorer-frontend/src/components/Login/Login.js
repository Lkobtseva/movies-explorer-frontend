import React, { useEffect } from "react";
import Form from "../Form/Form";
import FormCaption from "../FormCaption/FormCaption";
import useValidation from "../../hooks/useValidation";
import { Navigate } from "react-router-dom";

function Login({ loggedIn, handleLogin, errorMessage, setErrorMessage }) {
  const { data, errors, onChange, resetValidation, isFormValid } = useValidation();

  useEffect(() => {
    setErrorMessage("");
    resetValidation({ email: "", password: "" });
  }, [resetValidation, setErrorMessage]);

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    handleLogin(data);
  }

  if (loggedIn) {
    return <Navigate to="/movies" replace />;
  }

  return (
    <section className="login">
      <Form
        title="Рады видеть!"
        labelSubmit="Войти"
        param="log"
        errorMessage={errorMessage}
        onSubmit={handleSubmitLogin}
        isFormValid={isFormValid}
      >
        <label htmlFor="reg-email" className="form__label">
          E-mail
          <input
            className={`form__input ${errors.email ? "form__input_error" : ""}`}
            id="reg-email"
            name="email"
            type="email"
            onChange={onChange}
            value={data.email || ""}
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error">{errors.email || ""}</span>
        </label>
        <label htmlFor="reg-pass" className="form__label">
          Пароль
          <input
            className={`form__input ${errors.password ? "form__input_error" : ""}`}
            id="reg-pass"
            name="password"
            type="password"
            onChange={onChange}
            value={data.password || ""}
            required
          />
          <span className="form__input-error">{errors.password || ""}</span>
        </label>
      </Form>
      <FormCaption
        text="Ещё не зарегистрированы?"
        to="/signup"
        linkText="Регистрация"
      />
    </section>
  );
}

export default Login;
