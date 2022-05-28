import auth from '@react-native-firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import { User } from '@/model/User.types';

type PropsUserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const DEFAULT_VALUE: PropsUserContext = {
  setUser: () => null,
  user: null,
};

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUser = auth().currentUser;

    if (loggedUser && loggedUser.email) {
      setUser({
        email: loggedUser.email,
        id: loggedUser.uid,
        name: loggedUser.displayName,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
