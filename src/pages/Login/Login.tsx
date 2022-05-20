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

import SimpleAlert from '@/components/SimpleAlert';
import { useUserContext } from '@/contexts/UserContext';
import { useCustomNavigation } from '@/routes/Routes.hooks';
import { RoutesList } from '@/routes/Routes.types';
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { styles } from './Login.styles';

export const Login: React.FC = () => {
  const { setUser } = useUserContext();
  const { colors } = useTheme();
  const { navigate } = useCustomNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showInternetErrorDialog, setShowInternetErrorDialog] =
    useState<boolean>(false);
  const [showLoginErrorDialog, setShowLoginErrorDialog] =
    useState<boolean>(false);
  const [showNoVerifiedDialog, setShowNoVerifiedDialog] =
    useState<boolean>(false);

  async function signIn() {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (!response.user.emailVerified) {
        setShowNoVerifiedDialog(true);
      } else if (response.user.email && response.user.uid) {
        setUser({
          email: response.user.email,
          id: response.user.uid,
          name: response.user.displayName,
        });
      } else {
        setShowLoginErrorDialog(true);
      }
    } catch (error: any) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        setShowLoginErrorDialog(true);
      } else if (error.code === 'auth/network-request-failed') {
        setShowInternetErrorDialog(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Entrar</Headline>
      <TextInput
        autoComplete="email"
        keyboardType="email-address"
        label="E-mail"
        left={<TextInput.Icon name="email" />}
        onChangeText={setEmail}
        style={spacingStyles.bottomDefaultSpace}
        testID="email-input"
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
        testID="password-input"
        value={password}
      />
      <Button
        contentStyle={customComponentStyles.buttonDefault}
        disabled={loading || !email || !password}
        loading={loading}
        mode="contained"
        onPress={() => signIn()}
        style={spacingStyles.bottomDefaultSpace}
        testID="login-button">
        {loading ? '' : 'Entrar'}
      </Button>

      <Pressable
        onPress={() => navigate(RoutesList.ResetPassword)}
        style={styles.forgotPasswordText}
        testID="navigate-to-reset-password-button">
        <Subheading style={{ color: colors.primary }}>
          Esqueci a senha
        </Subheading>
      </Pressable>

      <Pressable
        onPress={() => navigate(RoutesList.Register)}
        style={styles.registerTextButton}
        testID="navigate-to-register-button">
        <Subheading>
          <>
            Novo no Aluguei?{' '}
            <Subheading style={{ color: colors.primary }}>
              Cadastre-se
            </Subheading>
          </>
        </Subheading>
      </Pressable>

      <SimpleAlert
        content="Não foi possível se conectar, verifique se você está conectado à internet"
        onClose={() => setShowInternetErrorDialog(false)}
        title="Erro de conexão"
        visible={showInternetErrorDialog}
      />

      <SimpleAlert
        content="Email ou senha incorretos, tente novamente"
        onClose={() => setShowLoginErrorDialog(false)}
        testIDOkButton="login-wrong-credentials-dialog-button"
        title="Erro ao entrar"
        visible={showLoginErrorDialog}
      />

      <SimpleAlert
        content="Confirme seu e-mail para poder acessar o aplicativo"
        onClose={() => setShowNoVerifiedDialog(false)}
        testIDOkButton="login-no-verified-dialog-button"
        title="Erro ao entrar"
        visible={showNoVerifiedDialog}
      />
    </View>
  );
};
