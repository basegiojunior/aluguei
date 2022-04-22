import auth from '@react-native-firebase/auth';
import React from 'react';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

import { useUserContext } from '@/contexts/UserContext';

export const Login: React.FC = () => {
  const { setUser } = useUserContext();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  async function signIn() {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);

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
      <TextInput
        label="Email"
        onChangeText={setEmail}
        testID="email-input"
        value={email}
      />
      <TextInput
        label="Password"
        onChangeText={setPassword}
        testID="password-input"
        value={password}
      />
      <Button mode="contained" onPress={() => signIn()} testID="login-button">
        Entrar
      </Button>
      <ActivityIndicator animating={loading} />
    </>
  );
};
