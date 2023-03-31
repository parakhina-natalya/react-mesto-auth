import editIcon from '../images/edit-icon.svg';
import addIcon from '../images/add-icon.svg';
import React from 'react';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Footer from '../components/Footer.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-box"
            onClick={props.onEditAvatar}>
            <img className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар" />
          </div>
          <div className="profile__info">
            <div className="profile__box">
              <h1 className="profile__author text-overflow">
                {currentUser.name}
              </h1>
              <button
                className="button button_el_edit"
                type="button"
                onClick={props.onEditProfile}>
                <img className="button__edit-icon"
                  src={editIcon}
                  alt="Редактировать профиль" />
              </button>
            </div>
            <p className="profile__slogan text-overflow">
              {currentUser.about}
            </p>
          </div>
          <button className="button button_el_add"
            type="button"
            onClick={props.onAddPlace}>
            <img className="button__add-icon"
              src={addIcon}
              alt="Добавить" />
          </button>
        </section>
        <section className="cards" aria-label="Фотогалерея">
          <ul className="cards__box">
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;