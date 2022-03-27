import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({
  loggedIn,
  isOpen,
  onClose,
  onToggle,
  userData,
  handleLogout,
  linkToggleState,
  onLinkClick,
}) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/" />
      <NavBar
        loggedIn={loggedIn}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        userData={userData}
        handleLogout={handleLogout}
        linkToggleState={linkToggleState}
        onLinkClick={onLinkClick}
      />
    </header>
  );
}

export default Header;
