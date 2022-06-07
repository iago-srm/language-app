import { ErrorMessages } from '.';
import { PortugueseErrorMessages as CommonPortugueseErrorMessages } from '@language-app/common';

export const PortugueseErrorMessages = {
  ...CommonPortugueseErrorMessages,
  [ErrorMessages.INVALID_ROLE]: 'Papel inválido',
  [ErrorMessages.EMAIL_IN_USE]: 'Já existe uma conta cadastrada com este e-mail.',
  [ErrorMessages.TOKEN_GENERATION]: 'Houve um erro na geração da autenticação: %{error}'
};
