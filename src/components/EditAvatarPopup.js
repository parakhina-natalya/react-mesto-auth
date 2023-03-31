import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    evt.target.reset();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      button="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input ref={avatarRef} className="form__input form__input_el_popup form__input_el_avatar" id="avatar-input"
        type="url" name="avatar" defaultValue="" placeholder="Ссылка на аватар" required />
      <span className="avatar-input-error form__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;