import React from "react";

function InfoTooltip() {
  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__info-tooltip">
          <form className="form">
            <button className="popup__close-button opacity" />
            <div className="form__info-icon form__info-icon_fail" />
            <h2 className="form__title">
              Вы успешно зарегистрировались!
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
