import React from "react";
import Form from "../Form/Form";
import FormCaption from "../FormCaption/FormCaption";

function Register() {
  return (
    <section className="register">
      <Form
        title="Добро пожаловать!"
        children={
          <>
            <label htmlFor="reg-name" className="form__label">
              Имя
              <input
              placeholder="Введите имя"
                className="form__input"
                id="reg-name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={30}
              />
              <span className="form__input-error"></span>
            </label>

            <label htmlFor="reg-email" className="form__label">
              E-mail
              <input
              placeholder="Введите почту"
                className="form__input"
                id="reg-email"
                name="email"
                type="email"
                required
              />
              <span className="form__input-error"></span>
            </label>

            <label htmlFor="reg-pass" className="form__label">
              Пароль
              <input
              placeholder="Придумайте пароль"
                className="form__input form__input_error"
                id="reg-pass"
                name="password"
                type="password"
                required
                minLength={3}
                maxLength={30}
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </label>
          </>
        }
        labelSubmit="Зарегистрироваться"
        param="reg"
      />
      <FormCaption text="Уже зарегистрированы?" to="/signin" linkText="Войти" />
    </section>
  );
}

export default Register;
