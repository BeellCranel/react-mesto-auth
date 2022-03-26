import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({ loggedIn, userData, handleLogout, linkToggleState, onNavButtonClick, onLinkClick }) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/" />
      <NavBar
        loggedIn={loggedIn}
        userData={userData}
        handleLogout={handleLogout}
        linkToggleState={linkToggleState}
        onNavButtonClick={onNavButtonClick}
        onLinkClick={onLinkClick}
      />
    </header>
  );
}

export default Header;
