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
import { useCustomNavigation } from '@/routes/Routes.hooks';
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { styles } from './ResetPassword.styles';

export const ResetPassword: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useCustomNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [showInternetErrorDialog, setShowInternetErrorDialog] = useState(false);
  const [showGeneralErrorDialog, setShowGeneralErrorDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  async function resetPassword() {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);

      setShowSuccessDialog(true);
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        setShowInternetErrorDialog(true);
      } else if (error.code === 'auth/invalid-email') {
        setShowSuccessDialog(true);
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

      <SimpleAlert
        content="Não foi possível restaurar a senha, tente novamente"
        onClose={() => setShowGeneralErrorDialog(false)}
        title="Erro"
        visible={showGeneralErrorDialog}
      />

      <SimpleAlert
        content="Não foi possível restaurar a senha, verifique sua conexão com a internet"
        onClose={() => setShowInternetErrorDialog(false)}
        title="Erro de conexão"
        visible={showInternetErrorDialog}
      />

      <SimpleAlert
        content="Solicitação realizada com sucesso, verifique seu email para mudar a senha"
        onClose={() => {
          setShowSuccessDialog(false);
          goBack();
        }}
        testIDOkButton="reset-password-success-button"
        title="Sucesso"
        visible={showSuccessDialog}
      />
    </View>
  );
};
