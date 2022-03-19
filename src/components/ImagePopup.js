import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {

  useEffect(() => {
    function closeByEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  });

  function handleOnClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <div className={card ? "popup popup_image popup_opened" : "popup popup_image"} onClick={handleOnClose}>
      <figure className="figure">
        <button className="popup__close-button opacity" onClick={onClose} type="button"></button>
        <img className="figure__image" src={card ? card.link : "#"} alt={card ? card.name : "фотография отсутствует"} />
        <figcaption className="figure__figcaption">
          <p className="figure__image-caption">{card ? card.name : ""}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
