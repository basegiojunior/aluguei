import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('Digite um email'),
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Digite a senha'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não são iguais')
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Digite a senha'),
});
