import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

function Login() {
  const {
    emailInput, passwordInput, isBtnDisabled, handleClick,
  } = useContext(LoginContext);
  const NUMBER8 = 8;

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={emailInput.value}
        onChange={emailInput.handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={passwordInput.value}
        onChange={passwordInput.handleChange}
      />
      {
        (passwordInput.value.length > 0 && passwordInput.value.length < NUMBER8) && (
          <small>
            Password deve conter no mínimo 8 caracteres
          </small>
        )
      }
      <button
        type="button"
        disabled={isBtnDisabled()}
        onClick={handleClick}
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;