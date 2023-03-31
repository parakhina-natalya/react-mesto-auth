import closeIcon from '../images/close-icon.svg';

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_${props.name} ${props.card.isOpen ? 'popup_opened' : ''}`}
      aria-label="Фотография">
      <div className="popup__container-figure">
        <button className="button button_el_close"
          type="button"
          onClick={props.onClose}>
          <img className="button__close-icon"
            src={closeIcon}
            alt="Закрыть" />
        </button>
        <figure className="figure">
          <img className="figure__img"
            src={props.card.cardData.link}
            alt={props.card.cardData.name} />
          <figcaption className="figure__caption">
            {props.card.cardData.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;