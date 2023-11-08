import React, { useMemo } from 'react';
import MainContext from './MainContext';

type MainProviderProps = {
  children: React.ReactNode;
};

function MainProvider({ children }: MainProviderProps) {
  const valueMain = useMemo(() => {

  }, []);

  return (
    <MainContext.Provider value={valueMain}>
      {children}
    </MainContext.Provider>
  );
}

export default MainProvider;
