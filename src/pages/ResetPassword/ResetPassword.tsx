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

import { useAlertContext } from '@/contexts/AlertContext';
import { useCustomNavigation } from '@/routes/Routes.hooks';
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { styles } from './ResetPassword.styles';

export const ResetPassword: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useCustomNavigation();
  const { showAlert } = useAlertContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  async function resetPassword() {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);

      showAlert({
        content:
          'Solicitação realizada com sucesso, verifique seu email para mudar a senha',
        onClose: () => goBack(),
        testIDOkButton: 'reset-password-success-button',
        title: 'Sucesso',
      });
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        showAlert({
          content:
            'Não foi possível restaurar a senha, verifique sua conexão com a internet',
          title: 'Erro de conexão',
        });
      } else if (error.code === 'auth/invalid-email') {
        showAlert({
          content:
            'Solicitação realizada com sucesso, verifique seu email para mudar a senha',
          onClose: () => goBack(),
          testIDOkButton: 'reset-password-success-button',
          title: 'Sucesso',
        });
      } else {
        showAlert({
          content: 'Não foi possível restaurar a senha, tente novamente',
          title: 'Erro',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Solicitar nova senha</Headline>
      <TextInput
        autoComplete="email"
        keyboardType="email-address"
        label="E-mail"
        left={<TextInput.Icon name="email" />}
        onChangeText={setEmail}
        style={spacingStyles.bottomDefaultSpace}
        testID="reset-password-email-input"
        value={email}
      />
      <Button
        contentStyle={customComponentStyles.buttonDefault}
        disabled={loading || !email}
        loading={loading}
        mode="contained"
        onPress={() => resetPassword()}
        style={spacingStyles.bottomDefaultSpace}
        testID="reset-password-button">
        {loading ? '' : 'Solicitar'}
      </Button>

      <Pressable onPress={goBack} style={styles.registerTextButton}>
        <Subheading>
          <>
            Lembrou sua senha?{' '}
            <Subheading style={{ color: colors.primary }}>Voltar</Subheading>
          </>
        </Subheading>
      </Pressable>
    </View>
  );
};
