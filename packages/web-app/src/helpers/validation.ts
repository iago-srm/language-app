import * as yup from 'yup'

enum ValidationMessages {
  REQUIRED = 'Campo Obrigatório',
  INVALID_EMAIL = 'E-mail inválido.',
  INVALID_PASSWORD = 'Senha inválida. Adicionar letras maiúsculas e minúsculas e números. Pelo menos 6 caracteres.',
  PASSWORD_DONT_MATCH = 'Confirmação de senha é diferente.',
}

const emailValidation = yup
  .string()
  .required(ValidationMessages.REQUIRED)
  .email(ValidationMessages.INVALID_EMAIL);
const passwordValidation = yup
  .string()
  .required(ValidationMessages.REQUIRED)
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    ValidationMessages.INVALID_PASSWORD
  )
export const loginSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
})

export const registerSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], ValidationMessages.PASSWORD_DONT_MATCH),
})
