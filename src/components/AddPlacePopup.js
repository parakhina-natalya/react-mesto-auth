import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function AddPlacePopup(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
    evt.target.reset();
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      button="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <input className="form__input form__input_el_popup form__input_el_title" ref={nameRef}
        id="title-input" type="text" name="title" defaultValue=""
        placeholder="Название" required minLength="2" maxLength="30" />
      <span className="title-input-error form__error"></span>

      <input className="form__input form__input_el_popup form__input_el_url" ref={linkRef}
        id="url-input" type="url" name="url"
        defaultValue="" placeholder="Ссылка на картинку" required />
      <span className="url-input-error form__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;