import React from "react";
import { Link } from "react-router-dom";

function NavBar({
  loggedIn,
  isOpen,
  onClose,
  onToggle,
  userData,
  handleLogout,
  linkToggleState,
  onLinkClick,
}) {
  function handleTogglePopup() {
    if (!onToggle) {
      isOpen();
    } else {
      onClose();
    }
  }

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
            className={
              !onToggle
                ? `menu__nav-button opacity`
                : `menu__nav-button_close opacity`
            }
            onClick={handleTogglePopup}
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
