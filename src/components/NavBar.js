import React from "react";
import { Link } from "react-router-dom";

function NavBar({
  loggedIn,
  userData,
  handleLogout,
  linkToggleState,
  onNavButtonClick,
  onLinkClick,
}) {
  return (
    <nav className="menu">
      {loggedIn ? (
        <>
          <div className="menu__item menu__item_email menu__item_disabled">
            {userData.userEmail}
          </div>
          <div
            className="menu__item menu__item_exit menu__item_disabled opacity"
            onClick={handleLogout}
          >
            Выйти
          </div>
          <button
            className="menu__nav-button opacity"
            onClick={onNavButtonClick}
            type="button"
          />
        </>
      ) : (
        <Link
          className="menu__item opacity"
          onClick={onLinkClick}
          to={linkToggleState ? "/sing-up" : "/sing-in"}
        >
          {linkToggleState ? "Регистрация" : "Войти"}
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
