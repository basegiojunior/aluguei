import React from 'react';
import { Button } from 'react-native-paper';

import { useCustomNavigation } from '@/routes/Routes.hooks';
import { RoutesList } from '@/routes/Routes.types';

export const Login: React.FC = () => {
  const { navigate } = useCustomNavigation();

  return (
    <Button mode="contained" onPress={() => navigate(RoutesList.Home)}>
      Login
    </Button>
  );
};
