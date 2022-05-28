import React from 'react';

import { AlertContextProvider } from './AlertContext';
import { UserContextProvider } from './UserContext';

const GlobalContext: React.FC = ({ children }) => {
  return (
    <UserContextProvider>
      <AlertContextProvider>{children}</AlertContextProvider>
    </UserContextProvider>
  );
};

export default GlobalContext;
