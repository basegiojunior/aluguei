// import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Login from '@/pages/Login';

const AuthStack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen component={Login} name="Login" />
    </AuthStack.Navigator>
  );
};
