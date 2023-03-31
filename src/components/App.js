import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../components/ProtectedRoute.js';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Register from '../components/Register.js';
import Login from '../components/Login.js';
import ImagePopup from '../components/ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import InfoTooltip from '../components/InfoTooltip.js'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipTitle, setIsInfoTooltipTitle] = useState('');
  const [isInfoTooltipImg, setIsInfoTooltipImg] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, cardData: {} });
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, cardData: card });
  }

  function handleInfoTooltip(title, img) {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipTitle(title);
    setIsInfoTooltipImg(img);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, cardData: {} });
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([currentUser, dataCards]) => {
          setCurrentUser(currentUser);
          setCards(dataCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(res) {
    api.setUserInfo(res)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(res) {
    api.setUserAvatar(res)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardDelId) {
    api.deleteCard(cardDelId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function auth(token) {
    api.getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
        }
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth(token);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  function handleLogin({ password, email }) {
    return api.authorize(password, email)
      .then((res) => {
        if (res) {
          setEmail(email)
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
  }


  function handleRegister({ password, email }) {
    return api.register(password, email)
      .then((res) => {
        if (res) {
          return res;
        }
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin', { replace: true });
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          loggedIn={loggedIn} />
        <Routes>
          <Route path="/signup" element={<Register onRegister={handleRegister} onInfoTooltip={handleInfoTooltip} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} onInfoTooltip={handleInfoTooltip} />} />

          <Route path="/"
            element={<ProtectedRouteElement element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn} />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          name="figure"
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          title={isInfoTooltipTitle}
          img={isInfoTooltipImg}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;