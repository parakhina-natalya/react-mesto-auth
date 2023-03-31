import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authorizations from '../components/Authorizations.js';

function Login({ onLogin, onInfoTooltip }) {
  const [resetForm, setResetForm] = useState(false);
  const navigate = useNavigate();

  function handleSubmit({ email, password }) {

    onLogin({ email, password })
      .then(() => {
        setResetForm(true);
      })
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        onInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.", false)
        console.log(err);
      });
  }

  return (
    <Authorizations
      title="Вход"
      button="Войти"
      onSubmit={handleSubmit}
      resetForm={resetForm} setResetForm={setResetForm}>
    </Authorizations>
  )
}

export default Login;