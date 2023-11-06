import { createContext } from 'react';

type LoginContextType = {
  emailInput: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  passwordInput: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  alertMessage: string;
  isLoading: boolean;
  isBtnDisabled: () => boolean;
  handleLogin: () => void;
};

const LoginContext = createContext({} as LoginContextType);

export default LoginContext;
