import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import { useUserContext } from '@/contexts/UserContext';

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
    <View>
      <Button mode="contained" onPress={() => signOut()}>
        Log out
      </Button>

      <ActivityIndicator animating={loading} />
    </View>
  );
};
