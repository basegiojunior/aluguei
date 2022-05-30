import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, List, useTheme } from 'react-native-paper';

import { useUserContext } from '@/contexts/UserContext';

import styles from './Settings.styles';

export const Settings: React.FC = () => {
  const { colors } = useTheme();
  const { setUser } = useUserContext();

  const [loading, setLoading] = useState<boolean>(false);

  async function signOut() {
    try {
      setLoading(true);
      await auth().signOut();
      setUser(null);
    } catch {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <List.Item
        left={() => <List.Icon color={colors.error} icon="logout" />}
        onPress={() => signOut()}
        title="Sair"
        titleStyle={{ color: colors.error }}
      />

      <ActivityIndicator animating={loading} />
    </View>
  );
};
