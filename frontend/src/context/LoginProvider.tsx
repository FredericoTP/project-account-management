import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from './LoginContext';
import useInput from '../hook/useInput';

type LoginProviderProps = {
  children: React.ReactNode;
};

function LoginProvider({ children }: LoginProviderProps) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const navigate = useNavigate();

  const valueLogin = useMemo(() => {
    const isBtnDisabled = () => {
      const NUMBER8 = 8;
      const validatePassword = passwordInput.value.length >= NUMBER8;
      const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return !(validatePassword && validEmail.test(emailInput.value));
    };

    const handleClick = () => {
      navigate('/home');
    };

    return {
      emailInput,
      passwordInput,
      isBtnDisabled,
      handleClick,
    };
  }, [emailInput, passwordInput, navigate]);

  return (
    <LoginContext.Provider value={valueLogin}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
