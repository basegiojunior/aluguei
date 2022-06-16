import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  BottomNavigationRoute = 'BottomNavigationRoute',
  Login = 'Login',
  Register = 'Register',
  ResetPassword = 'ResetPassword',
}

export type MainParamList = {
  [RoutesList.BottomNavigationRoute]: undefined;
  [RoutesList.Register]: undefined;
  [RoutesList.Login]: undefined;
  [RoutesList.ResetPassword]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
