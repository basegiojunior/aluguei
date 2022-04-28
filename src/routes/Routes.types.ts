import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  Home = 'Home',
  Login = 'Login',
  Register = 'Register',
  ResetPassword = 'ResetPassword',
}

export type MainParamList = {
  [RoutesList.Home]: undefined;
  [RoutesList.Register]: undefined;
  [RoutesList.Login]: undefined;
  [RoutesList.ResetPassword]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
