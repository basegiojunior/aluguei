import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { useCustomNavigation } from '@/routes/Routes.hooks';
import { RoutesList } from '@/routes/Routes.types';

export const Home: React.FC = () => {
  const { navigate } = useCustomNavigation();

  return (
    <View>
      <Button mode="contained" onPress={() => navigate(RoutesList.Login)}>
        Sair
      </Button>
    </View>
  );
};
