// import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useUserContext } from '@/contexts/UserContext';
import Home from '@/pages/Home';

import { AuthRoute } from './Routes.auth';

const MainStack = createNativeStackNavigator();

export const MainRoute = () => {
  const { user } = useUserContext();

  if (!user) {
    return <AuthRoute />;
  }

  return (
    <MainStack.Navigator>
      <MainStack.Screen component={Home} name="Home" />
    </MainStack.Navigator>
  );
};
