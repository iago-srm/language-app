import { ErrorMessagesLabels as ErrorMessages } from "./labels";

export const PortugueseErrorMessages = {
  [ErrorMessages.INVALID_EMAIL]: "Invalid e-mail",
  [ErrorMessages.INVALID_NAME]: "Invalid name",
  [ErrorMessages.INVALID_PASSWORD]: "Invalid password",
  [ErrorMessages.PASSWORDS_DONT_MATCH]: "Passwords dont match",
  [ErrorMessages.DATABASE_ERROR]:
    "Algo deu errado para se conectar ao banco de dados.",
  [ErrorMessages.CANNOT_ALTER_THIS_USER]:
    "Você não tem autorização para alterar este usuário.",
  [ErrorMessages.INVALID_TOKEN]:
    "Token expirado. Por favor, realize o login novamente.",
  [ErrorMessages.PARAMETER_NOT_PROVIDED]:
    "Algum parâmetro não foi fornecido. Por favor, consultar a documentação.",
  [ErrorMessages.USER_NOT_FOUND]: "Usuário não encontrado.",
  [ErrorMessages.MALFORMED_TOKEN]:
    "Token de autenticação está com formato errado",
  [ErrorMessages.MISSING_TOKEN]: "Por favor, fornecer um token de autenticação",
  [ErrorMessages.ROUTE_NOT_FOUND]: "Rota não encontrada",
};
