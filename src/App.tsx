import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { enableLatestRenderer } from 'react-native-maps';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import GlobalContext from './contexts';
import { MainRoute } from './routes/Routes';

enableLatestRenderer();

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
