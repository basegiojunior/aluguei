import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Button,
  Headline,
  Subheading,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { useCustomNavigation } from '@/routes/Routes.hooks';
import { RoutesList } from '@/routes/Routes.types';
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { styles } from './Register.styles';

export const Register: React.FC = () => {
  const { navigate } = useCustomNavigation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function signUp() {
    try {
      setLoading(true);
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (response.user.email && response.user.uid) {
        navigate(RoutesList.Login);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Cadastrar</Headline>
      <TextInput
        autoComplete="email"
        keyboardType="email-address"
        label="Email"
        left={<TextInput.Icon name="email" />}
        onChangeText={setEmail}
        style={spacingStyles.bottomDefaultSpace}
        testID="register-email-input"
        value={email}
      />
      <TextInput
        autoComplete="password"
        label="Senha"
        left={<TextInput.Icon name="key" />}
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
        style={spacingStyles.bottomDefaultSpace}
        testID="register-password-input"
        value={password}
      />
      <TextInput
        autoComplete="password"
        label="Confirme a senha"
        left={<TextInput.Icon name="key" />}
        onChangeText={setConfirmPassword}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
        style={spacingStyles.bottomDefaultSpace}
        testID="register-confirm-password-input"
        value={confirmPassword}
      />
      <Button
        contentStyle={customComponentStyles.buttonDefault}
        loading={loading}
        mode="contained"
        onPress={() => signUp()}
        style={spacingStyles.bottomDefaultSpace}
        testID="login-button">
        {loading ? '' : 'Entrar'}
      </Button>

      <Pressable
        onPress={() => navigate(RoutesList.Login)}
        style={styles.registerTextButton}>
        <Subheading>
          <>
            Já tem cadastro?{' '}
            <Subheading style={{ color: colors.primary }}>
              Entre aqui
            </Subheading>
          </>
        </Subheading>
      </Pressable>
    </View>
  );
};
