import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import Home from '@/pages/Home';

const App = () => {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
};

export default App;
