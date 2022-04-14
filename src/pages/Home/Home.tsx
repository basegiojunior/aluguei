import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

// import { Container } from './styles';

export const Home: React.FC = () => {
  return (
    <View>
      <Button icon="web-clock" mode="contained">
        Botão Bonitinho
      </Button>
    </View>
  );
};
