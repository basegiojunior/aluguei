import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import Search from '@/pages/Search';
import Settings from '@/pages/Settings';

const BototmNavigationRoute: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { icon: 'magnify', key: 'search', title: 'Pesquisar' },
    { icon: 'cog', key: 'settings', title: 'Configurações' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    search: Search,
    settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BototmNavigationRoute;
