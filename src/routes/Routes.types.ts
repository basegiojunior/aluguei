import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum RoutesList {
  Home = 'Home',
  Login = 'Login',
}

export type MainParamList = {
  [RoutesList.Home]: undefined;
  [RoutesList.Login]: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<MainParamList>;
