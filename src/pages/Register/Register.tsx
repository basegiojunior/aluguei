import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  Button,
  Headline,
  HelperText,
  Subheading,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { ValidationError } from 'yup';

import { useCustomNavigation } from '@/routes/Routes.hooks';
import { RoutesList } from '@/routes/Routes.types';
import customComponentStyles from '@/styles/customComponents';
import spacingStyles from '@/styles/spacing';

import { registerSchema } from './Register.schemas';
import { styles } from './Register.styles';

type FieldValidation = {
  email: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
};

export const Register: React.FC = () => {
  const { navigate, goBack } = useCustomNavigation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldValidation>({
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
  });

  async function signUp() {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);

      navigate(RoutesList.Login);
    } catch {
      setLoading(false);
    }
  }

  async function validateForm() {
    try {
      registerSchema.validateSync(
        { email, password, passwordConfirm },
        { abortEarly: false, strict: false },
      );

      signUp();
    } catch (error) {
      if (error instanceof ValidationError) {
        const validatedErrors: { [key in string]: string | undefined } = {
          email: undefined,
          password: undefined,
          passwordConfirm: undefined,
        };

        error.inner.forEach(item => {
          if (item.path && validatedErrors.hasOwnProperty(item.path)) {
            validatedErrors[item.path] = item.message;
          }
        });

        setErrors(validatedErrors as FieldValidation);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>Cadastrar</Headline>
      <TextInput
        autoComplete="email"
        error={!!errors.email}
        keyboardType="email-address"
        label="Email"
        left={<TextInput.Icon name="email" />}
        onChangeText={setEmail}
        style={!errors.email ? spacingStyles.bottomDefaultSpace : undefined}
        testID="register-email-input"
        value={email}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}
      <TextInput
        autoComplete="password"
        error={!!errors.password}
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
        style={!errors.password ? spacingStyles.bottomDefaultSpace : undefined}
        testID="register-password-input"
        value={password}
      />
      {errors.password && (
        <HelperText type="error">{errors.password}</HelperText>
      )}
      <TextInput
        autoComplete="password"
        error={!!errors.passwordConfirm}
        label="Confirme a senha"
        left={<TextInput.Icon name="key" />}
        onChangeText={setPasswordConfirm}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye' : 'eye-off'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
        style={
          !errors.passwordConfirm ? spacingStyles.bottomDefaultSpace : undefined
        }
        testID="register-confirm-password-input"
        value={passwordConfirm}
      />
      {errors.passwordConfirm && (
        <HelperText type="error">{errors.passwordConfirm}</HelperText>
      )}
      <Button
        contentStyle={customComponentStyles.buttonDefault}
        loading={loading}
        mode="contained"
        onPress={() => validateForm()}
        style={spacingStyles.bottomDefaultSpace}
        testID="login-button">
        {loading ? '' : 'Cadastrar'}
      </Button>

      <Pressable onPress={goBack} style={styles.registerTextButton}>
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
