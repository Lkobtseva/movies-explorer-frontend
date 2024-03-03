import React, { useEffect } from "react";
import Form from "../Form/Form";
import FormCaption from "../FormCaption/FormCaption";
import { Navigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";

function Register({ loggedIn, errorMessage, setErrorMessage, handleRegister }) {
  const { data, errors, onChange, resetValidation, isFormValid } = useValidation();

  useEffect(() => {
    setErrorMessage("");
    resetValidation({ name: "", email: "", password: "" });
  }, [setErrorMessage]);

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    handleRegister(data);
  }

  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
        labelSubmit="Зарегистрироваться"
        param="reg"
        onSubmit={handleSubmitRegister}
        isFormValid={isFormValid}
        errorMessage={errorMessage}
      >
        <label htmlFor="reg-name" className="form__label">
          Имя
          <input
            className={`form__input ${errors.name ? "form__input_error" : ""}`}
            id="reg-name"
            name="name"
            type="text"
            placeholder="Введите имя"
            onChange={onChange}
            value={data.name || ""}
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__input-error">{errors.name || ""}</span>
        </label>

        <label htmlFor="reg-email" className="form__label">
          E-mail
          <input
            className={`form__input ${errors.email ? "form__input_error" : ""}`}
            id="reg-email"
            placeholder="Введите email"
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
            placeholder="Придумайте пароль"
            className={`form__input ${errors.password ? "form__input_error" : ""}`}
            id="reg-pass"
            name="password"
            type="password"
            onChange={onChange}
            value={data.password || ""}
            required
            minLength={3}
            maxLength={30}
          />
          <span className="form__input-error">{errors.password || ""}</span>
        </label>
      </Form>
      <FormCaption text="Уже зарегистрированы?" to="/signin" linkText="Войти" />
    </section>
  );
}

export default Register;
