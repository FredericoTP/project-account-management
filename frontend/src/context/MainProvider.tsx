import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import MainContext from './MainContext';
import { hasSession, decodeToken, getToken } from '../utils/auth/authentication';
import api from '../utils/apíInstance';

type MainProviderProps = {
  children: React.ReactNode;
};

function MainProvider({ children }: MainProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [invoice, setInvoice] = useState([]);

  const valueMain = useMemo(() => {
    const checkLogin = () => {
      const token = hasSession();

      if (!token) {
        alert('Você precisa estar logado para acessar esta página!');
        navigate('/', { replace: true });
      }
    };

    const userInfo = () => {
      setUser(decodeToken());
    };

    const accountInvoices = async () => {
      try {
        setIsLoading(true);
        const token = getToken();

        const response = await api.get('/invoice', { headers: { Authorization: token } });
        setInvoice(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setAlertMessage(err.response?.data.message);
        }
        setIsLoading(false);
      }
    };

    return {
      checkLogin,
      userInfo,
      user,
      accountInvoices,
      isLoading,
      alertMessage,
      invoice,
    };
  }, [navigate, user, isLoading, alertMessage, invoice]);

  return (
    <MainContext.Provider value={valueMain}>
      {children}
    </MainContext.Provider>
  );
}

export default MainProvider;
