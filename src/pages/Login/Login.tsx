import auth from '@react-native-firebase/auth';
import React from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

import { useUserContext } from '@/contexts/UserContext';

export const Login: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setUser } = useUserContext();

  async function signIn() {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(
        'basegiojunior@gmail.com',
        '.Ms12al15.',
      );

      if (response.user.email && response.user.uid) {
        setUser({
          email: response.user.email,
          id: response.user.uid,
          name: response.user.displayName,
        });
      } else {
        throw new Error("Couldn't get user data");
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <Button mode="contained" onPress={() => signIn()}>
        Entrar
      </Button>
      <ActivityIndicator animating={loading} />
    </>
  );
};
