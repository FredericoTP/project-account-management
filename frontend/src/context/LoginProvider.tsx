import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import LoginContext from './LoginContext';
import useInput from '../hook/useInput';
import api from '../utils/apíInstance';

type LoginProviderProps = {
  children: React.ReactNode;
};

function LoginProvider({ children }: LoginProviderProps) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const valueLogin = useMemo(() => {
    const isBtnDisabled = () => {
      const NUMBER8 = 8;
      const validatePassword = passwordInput.value.length >= NUMBER8;
      const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return !(validatePassword && validEmail.test(emailInput.value));
    };

    const handleLogin = async () => {
      try {
        setIsLoading(true);

        const response = await api.post('/login', {
          email: emailInput.value,
          password: passwordInput.value,
        });

        if (response.data.token) {
          setAlertMessage('Login realizado com sucesso!');
          localStorage.setItem('token', response.data.token);
          setIsLoading(false);
          navigate('/home', { replace: true });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setAlertMessage(err.response?.data.message);
        }
        setIsLoading(false);
      }
    };

    return {
      emailInput,
      passwordInput,
      alertMessage,
      isLoading,
      isBtnDisabled,
      handleLogin,
    };
  }, [emailInput, passwordInput, alertMessage, isLoading, navigate]);

  return (
    <LoginContext.Provider value={valueLogin}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
