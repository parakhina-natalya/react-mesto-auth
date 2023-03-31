import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Authorizations(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/', { replace: true })
    }
  }, [navigate]);

  useEffect(() => {
    if (props.resetForm) {
      setEmail('');
      setPassword('');
      props.setResetForm(false);
    }
  }, [props.resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({ email, password });
  }

  return (
    <section className="authorizations">
      <h1 className="authorizations__title">{`${props.title}`}</h1>
      <form className="form__authorizations" name="authorizations" noValidate onSubmit={handleSubmit}>

        <input className="form__input form__input_el_authorizations" id="email-input" onChange={handleChangeEmail}
          type="email" name="email" value={email} placeholder="Email" required minLength="2" maxLength="40">
        </input>

        <input className="form__input form__input_el_authorizations" id="password-input" onChange={handleChangePassword}
          type="password" name="password" value={password} placeholder="Пароль" required minLength="8" maxLength="40">
        </input>

        <button className="button button_el_authorizations" type="submit">
          <span className="button__text-content">{`${props.button}`}</span>
        </button>
      </form>
      {props.children}
    </section>
  );
}

export default Authorizations;