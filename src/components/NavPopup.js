import React from "react";

function NavPopup({ onToggle, handleLogout }) {
  return (
    <div className={onToggle ? `nav-popup nav-popup_opened` : `nav-popup`}>
      <div className="menu__item menu__item_email">dergachroma@gmail.com</div>
      <div className="menu__item menu__item_exit opacity" onClick={handleLogout}>
        Выйти
      </div>
    </div>
  );
}

export default NavPopup;
