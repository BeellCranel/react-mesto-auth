import React from "react";
import { Link } from "react-router-dom";

function NavBar({ loggedIn, linkToggleState, onLinkClick }) {
  return (
    <nav className="menu">
      {loggedIn ? (
        <Link className="menu__item opacity" to="/sing-in">
          Выйти
        </Link>
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
