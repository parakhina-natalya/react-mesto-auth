import logo from '../images/logo-mesto.svg';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className={`${props.loggedIn ? "header__container" : "header__container_row"}`}>
        <img className="header__logo"
          src={logo}
          alt="логотип проекта Место" />
        <nav className={`${props.loggedIn ? "nav" : "nav_row"}`}>
          {props.loggedIn ?
            <>
              <p className="nav__user-email">{props.email}</p>
              <span className="nav__link" onClick={props.onSignOut}>Выйти</span>
            </> :
            <>
              <NavLink to="/signin" className={({ isActive }) => `${!isActive ? "nav__link" : "nav__link_disabled"}`}>Войти</NavLink>
              <NavLink to="/signup" className={({ isActive }) => `${!isActive ? "nav__link" : "nav__link_disabled"}`}>Регистрация</NavLink>
            </>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
