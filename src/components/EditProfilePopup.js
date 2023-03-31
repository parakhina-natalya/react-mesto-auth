import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopupOpen(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      button="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <input className="form__input form__input_el_popup form__input_el_author" id="author-input"
        type="text" name="author" value={name || ""} onChange={handleChangeName}
        placeholder="Имя" required minLength="2" maxLength="40" />
      <span className="author-input-error form__error"></span>

      <input className="form__input form__input_el_popup form__input_el_slogan" id="slogan-input"
        type="text" name="about" value={description || ""} onChange={handleChangeDescription}
        placeholder="О себе" required minLength="2" maxLength="200" />
      <span className="slogan-input-error form__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopupOpen;