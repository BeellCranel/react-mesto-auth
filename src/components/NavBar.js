import React from "react";
import { Link } from "react-router-dom";

function NavBar({ loggedIn, linkToggleState, onNavButtonClick,  onLinkClick }) {
  return (
    <nav className="menu">
      {loggedIn ? (
        <>
          <div className="menu__item menu__item_email menu__item_disabled">
            dergachroma@gmail.com
          </div>
          <Link
            className="menu__item menu__item_exit menu__item_disabled opacity"
            to="/sing-in"
          >
            Выйти
          </Link>
          <button className="menu__nav-button opacity" onClick={onNavButtonClick} type="button" />
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
