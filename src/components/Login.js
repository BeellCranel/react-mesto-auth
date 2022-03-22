import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Login() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <div className="form-container">
        <form className="form" name="login">
          <h2 className="form__title form__title_theme_dark">Вход</h2>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <input
                className="form__input form__input_theme_dark"
                id="login-email"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <span className="form__error" id="login-email-error"></span>
            </label>
            <label className="form__field">
              <input
                className="form__input form__input_theme_dark"
                id="login-password"
                type="text"
                name="password"
                placeholder="Пароль"
                minLength="6"
                maxLength="20"
                required
              />
              <span className="form__error" id="login-password-error"></span>
            </label>
          </fieldset>
          <input
            className="form__submit form__submit_theme_dark"
            type="submit"
            name="submit"
            value="Войти"
          />
        </form>
      </div>
    </main>
  );
}

export default Login;
