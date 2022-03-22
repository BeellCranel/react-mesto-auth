import { useEffect } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  subBtnText,
  children,
}) {
  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  });

  function handleOnClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      onClose();
    }
  }

  return (
    <div
      className={isOpen ? `popup popup_opened` : `popup`}
      onClick={handleOnClose}
    >
      <div className="popup__content">
        <button
          className="popup__close-button opacity"
          onClick={onClose}
          type="button"
        ></button>
        <form className="form" name={`${name}-form`} onSubmit={onSubmit}>
          <h2 className="form__title form__title_theme_white">{title}</h2>
          {children}
          <input
            className="form__submit"
            type="submit"
            name="submit"
            value={subBtnText}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
