import React from "react";
import { Link } from "react-router-dom";

function NavPopup({ onToggle }) {
  return (
    <div className={onToggle ? `nav-popup nav-popup_opened` : `nav-popup`}>
      <div className="menu__item menu__item_email">dergachroma@gmail.com</div>
      <Link className="menu__item menu__item_exit opacity" to="/sing-in">
        Выйти
      </Link>
    </div>
  );
}

export default NavPopup;
