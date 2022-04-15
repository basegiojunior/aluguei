import { useNavigation } from '@react-navigation/native';

import { MainNavigationProps } from '@/routes/Routes.types';

export const useCustomNavigation = () => {
  const navigation = useNavigation<MainNavigationProps>();

  return navigation;
};
