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
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { styles } from './ResetPassword.styles';

export const ResetPassword: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useCustomNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  async function resetPassword() {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
    } catch {
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
        testID="email-input"
        value={email}
      />
      <Button
        contentStyle={customComponentStyles.buttonDefault}
        loading={loading}
        mode="contained"
        onPress={() => resetPassword()}
        style={spacingStyles.bottomDefaultSpace}
        testID="login-button">
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
