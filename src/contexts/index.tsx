import React from 'react';

import { UserContextProvider } from './UserContext';

const GlobalContext: React.FC = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default GlobalContext;
