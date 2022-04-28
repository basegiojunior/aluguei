// import { NavigationProp } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';

import { RoutesList } from './Routes.types';

const AuthStack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        component={Login}
        name={RoutesList.Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        component={Register}
        name={RoutesList.Register}
        options={{ headerTransparent: true, title: '' }}
      />
      <AuthStack.Screen
        component={ResetPassword}
        name={RoutesList.ResetPassword}
        options={{ headerTransparent: true, title: '' }}
      />
    </AuthStack.Navigator>
  );
};
