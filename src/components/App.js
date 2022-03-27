import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavPopup from "./NavPopup";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as mestoAuth from "../utils/mestoAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // стэйт интерактивности попапов
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  // поведение попапа отображения результатов регистрации
  const [isSuccessMessageTog, setIsSuccessMessageTog] = useState();
  // стэйт для попапа простотра изображений
  const [selectedCardView, setSelectedCardView] = useState(null);
  // стэйт для удаления карточек
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);
  // стэйт логики поведения навигационных ссылок
  const [linkToggleState, setLinkToggleState] = useState(true);
  // стэйт основных данных
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  // первичная загрузка профеля пользователся
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

  // первичная загрузка карточек на страницу
  useEffect(() => {
    api
      .getCards()
      .then((cardsArr) => {
        setCards(cardsArr);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с сервера: ${err}`);
      });
  }, [userData]);

  // первичная проверка токена пользователя

  useEffect(() => {
    tokenCheck();
  }, []);

  //функция закрытия всех попапов

  function closeAllPopups() {
    setIsNavPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCardView(null);
    setSelectedCardDelete(null);
  }

  // функционал попапа отображения результатов регистрации

  function handleInfoTooltipOpen() {
    setIsInfoTooltip(true);
  }

  // функционал логина

  function handleLogin(email, password) {
    mestoAuth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        setIsSuccessMessageTog(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    mestoAuth
      .getContent(jwt)
      .then((res) => {
        setUserData({
          ...userData,
          userEmail: res.data.email,
        });
        setLoggedIn(true);
        history.push("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      tokenCheck();
    }
  }, [loggedIn]);

  function handleLogout() {
    localStorage.removeItem("jwt");
    history.push("/sing-in");
    setLoggedIn(false);
  }

  // функчионал регистрации

  function handleRegister(email, password) {
    mestoAuth
      .register(email, password)
      .then(() => {
        setLinkToggleState(true);
        history.push("/sing-in");
        setIsSuccessMessageTog(true);
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        setIsSuccessMessageTog(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  }

  // функционал NavPopup

  function handleNavPopupOpen() {
    setIsNavPopupOpen(true);
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

  //  функционал NavBar

  function handleMenuLinkClick() {
    if (linkToggleState) {
      setLinkToggleState(false);
    } else {
      setLinkToggleState(true);
    }
  }

  // функционал попапа редактирования аватара

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link)
      .then((userInfo) => {
        setCurrentUser({
          ...currentUser,
          ...userInfo,
        });
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
      <div className="app">
        <NavPopup
          isOpen={isNavPopupOpen}
          onClose={closeAllPopups}
          handleLogout={handleLogout}
          userData={userData}
        />

        <Header
          loggedIn={loggedIn}
          isOpen={handleNavPopupOpen}
          onClose={closeAllPopups}
          onToggle={isNavPopupOpen}
          userData={userData}
          handleLogout={handleLogout}
          linkToggleState={linkToggleState}
          onLinkClick={handleMenuLinkClick}
        />

        <Switch>
          <Route path="/sing-up">
            <Register
              handleRegister={handleRegister}
              handleInfoTooltipOpen={handleInfoTooltipOpen}
              onLinkClick={handleMenuLinkClick}
            />
          </Route>

          <Route path="/sing-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/">
            <ProtectedRoute
              path="/main"
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardsLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onConfirmDelete={handleConfirmDeleteClick}
            />
          </Route>
        </Switch>

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

        <InfoTooltip
          isOpen={isInfoTooltip}
          isSuccessMessageTog={isSuccessMessageTog}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
