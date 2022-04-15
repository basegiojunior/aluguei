import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { MainRoute } from './routes/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <MainRoute />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
