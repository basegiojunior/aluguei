// import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from '@/pages/Home';
import Login from '@/pages/Login';

const MainStack = createNativeStackNavigator();

export const MainRoute = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen component={Home} name="Home" />
      <MainStack.Screen component={Login} name="Login" />
    </MainStack.Navigator>
  );
};
