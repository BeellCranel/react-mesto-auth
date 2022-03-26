import React from "react";

function InfoTooltip({ isOpen, isSuccessMessageTog, onClose }) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__content">
        <div className="popup__info-tooltip">
          <button
            className="popup__close-button opacity"
            onClick={onClose}
            type="button"
          />
          <form className="form">
            <div
              className={
                isSuccessMessageTog
                  ? `form__info-icon form__info-icon_success`
                  : `form__info-icon form__info-icon_fail`
              }
            />
            <h2 className="form__title">
              {isSuccessMessageTog
                ? `Вы успешно зарегистрировались!`
                : `Что-то пошло не так!
Попробуйте ещё раз.`}
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
