import delIcon from '../images/del-icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`button button_el_like ${isLiked && 'button_el_like_active'}`);

  return (
    <li className="card">
      {isOwn && <button className="button button_el_delete"
        type="button" onClick={() => props.onCardDelete(props.card._id)}>
        <img className="button__add-delete"
          src={delIcon}
          alt="Удалить" />
      </button>}
      <img className="card__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={() => props.onClick(props.card)} />
      <div className="card__info">
        <h2 className="card__title text-overflow"> {props.card.name} </h2>
        <div className="card__like-box">
          <button className={cardLikeButtonClassName}
            type="button" onClick={() => props.onCardLike(props.card)}>
          </button>
          <p className="card__likes-total">
            {props.card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Card;