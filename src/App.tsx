import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import GlobalContext from './contexts';
import { MainRoute } from './routes/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={{ ...DefaultTheme, dark: false }}>
        <GlobalContext>
          <MainRoute />
        </GlobalContext>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
