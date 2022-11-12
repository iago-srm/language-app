import { EmailStringsLabels, ErrorMessagesLabels } from "./labels";
import { PortugueseErrorMessages as CommonPortugueseErrorMessages } from "@language-app/common-utils";

export const PortugueseErrorMessages = {
  ...CommonPortugueseErrorMessages,
  [ErrorMessagesLabels.INVALID_ROLE]: "Papel inválido",
  [ErrorMessagesLabels.EMAIL_IN_USE]:
    "Já existe uma conta cadastrada com este e-mail.",
  [ErrorMessagesLabels.TOKEN_GENERATION]:
    "Houve um erro na geração da autenticação: %{error}",
  [ErrorMessagesLabels.INVALID_CREDENTIALS]: "E-mail ou senha incorretos.",
  [ErrorMessagesLabels.UNVERIFIED_USER]:
    "Conta não verificada. Por favor, clicar no link enviado para %{email}",
  [ErrorMessagesLabels.VALIDATION_TOKEN]: "Token de verificação inválido",
};

export const PortugueseEmailStrings = {
  [EmailStringsLabels.FORGOT_PASSWORD_SUBJECT]:
    "Crie uma nova senha em language-app",
  [EmailStringsLabels.FORGOT_PASSWORD_BODY]: (url: string) => `
    <p>Clique no link para criar uma nova senha: ${url}</p>
    <p>Se você não pediu uma nova senha, ignore este e-mail.</p>
  `,
  [EmailStringsLabels.VERIFY_ACCOUNT_SUBJECT]:
    "Confirme sua conta em language-app",
  [EmailStringsLabels.VERIFY_ACCOUNT_BODY]: (url: string) =>
    `<p>Clique no link para confirmar sua conta: ${url}</p>`,
};
