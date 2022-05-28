import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { useUserContext } from '@/contexts/UserContext';

import styles from './Home.styles';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUserContext();

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
      <Button mode="contained" onPress={() => signOut()} testID="logout-button">
        Log out
      </Button>

      <ActivityIndicator animating={loading} />
    </View>
  );
};
