import { createContext } from 'react';

type MainContextType = {
  checkLogin: () => void;
  userInfo: () => void;
  accountInvoices: () => Promise<void>;
  user: {};
  isLoading: boolean;
  alertMessage: string;
  invoice: never[]
};

const MainContext = createContext({} as MainContextType);

export default MainContext;
