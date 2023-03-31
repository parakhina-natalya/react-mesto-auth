import closeIcon from '../images/close-icon.svg';
import noIcon from '../images/no-icon.svg';
import yesIcon from '../images/yes-icon.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_position_info">
        <button className="button button_el_close"
          type="button" onClick={props.onClose}>
          <img className="button__close-icon"
            src={closeIcon} alt="Закрыть" />
        </button>
        <div className='popup__info'>
          <img className='popup__info-img' src={props.img ? yesIcon : noIcon} />
          <h2 className="popup__title popup__title_info">
            {props.title}
          </h2>
        </div>
      </div>
    </section>
  );
}


export default InfoTooltip;