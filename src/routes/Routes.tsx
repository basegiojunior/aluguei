// import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useUserContext } from '@/contexts/UserContext';

import { AuthRoute } from './Routes.auth';
import BototmNavigationRoute from './Routes.bottomNavigation';

const MainStack = createNativeStackNavigator();

export const MainRoute = () => {
  const { user } = useUserContext();

  if (!user) {
    return <AuthRoute />;
  }

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        component={BototmNavigationRoute}
        name="BottomNavigationRoute"
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};
