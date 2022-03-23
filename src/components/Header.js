import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({ loggedIn, linkToggleState, onNavButtonClick, onLinkClick }) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/" />
      <NavBar
        loggedIn={loggedIn}
        linkToggleState={linkToggleState}
        onNavButtonClick={onNavButtonClick}
        onLinkClick={onLinkClick}
      />
    </header>
  );
}

export default Header;
