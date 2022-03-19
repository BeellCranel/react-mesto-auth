import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // обьявляем стэйт переменные
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCardView, setSelectedCardView] = useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`Ошибка получения данных о пользователе: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cardsArr) => {
        setCards(cardsArr);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с сервера: ${err}`);
      });
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCardView(null);
    setSelectedCardDelete(null);
  }

  // функционал попапа подтверждения удаления карточки

  function handleConfirmDeleteClick(card) {
    setSelectedCardDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // функционал попапа просмотра изображения

  function handleCardClick(card) {
    setSelectedCardView(card);
  }

  // функционал попапа редактирования аватара

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования изображения профиля: ${err}`);
      });
  }

  // функционал попапа редактирования профиля

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(name, description) {
    api
      .editInfo(name, description)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка изменения данных пользователя: ${err}`);
      });
  }

  // функционал попапа добавления карточек

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(place, url) {
    api
      .uploadCard(place, url)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки: ${err}`);
      });
  }

  // функционал поведения карточек

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка добавления или удаления лайка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />

        <Main
          cards={cards}
          onCardsLike={handleCardLike}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onConfirmDelete={handleConfirmDeleteClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          card={selectedCardDelete}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCardView} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
