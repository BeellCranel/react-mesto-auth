import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header({ loggedIn, linkToggleState, onLinkClick }) {
  return (
    <header className="header">
      <Link className="logo opacity" to="/" />
      <NavBar
        loggedIn={loggedIn}
        linkToggleState={linkToggleState}
        onLinkClick={onLinkClick}
      />
    </header>
  );
}

export default Header;
