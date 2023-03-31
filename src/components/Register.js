import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Authorizations from '../components/Authorizations.js';

function Register({ onRegister, onInfoTooltip }) {
  const [resetForm, setResetForm] = useState(false);
  const navigate = useNavigate();

  function handleSubmit({ email, password }) {
    onRegister({ email, password })
      .then(() => {
        setResetForm(true);
      })
      .then(() => {
        onInfoTooltip("Вы успешно зарегистрировались!", true)
        navigate('/signin', { replace: true })
      })
      .catch((err) => {
        onInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.", false)
        console.log(err);
      });
  }

  return (
    <Authorizations
      title="Регистрация"
      button="Зарегистрироваться"
      onSubmit={handleSubmit}
      resetForm={resetForm}
      setResetForm={setResetForm}>
      <div className="authorizations__signin">
        <p className="authorizations__text">Уже зарегистрированы? <Link to="/signin"
          className="authorizations__login-link">Войти</Link></p>
      </div>
    </Authorizations>
  )
}
export default Register;