import { PortugueseErrorMessages as CommonPortugueseErrorMessages } from "@language-app/common-utils";
import { ErrorMessagesLabels, EmailStringsLabels } from "./labels";
import { DomainRules } from "@language-app/common-core";

export const PortugueseErrorMessages = {
  ...CommonPortugueseErrorMessages,
  [ErrorMessagesLabels.ACTIVITY_OPTION_LENGTH]:
    "Texto da opção %{text}é inválido. Comprimento da opção deve ser entre %{min} e %{max} caracteres",
  [ErrorMessagesLabels.ACTIVITY_TOPIC]: `Tópico %{text} inválido. Tópicos válidos são ${DomainRules.ACTIVITY.TOPICS}`,
  [ErrorMessagesLabels.ACTIVITY_TYPE]: `Tipo de atividade %{text} é inválido. Tipos válidos são ${DomainRules.ACTIVITY.CONTENTTYPE}`,
  [ErrorMessagesLabels.ACTIVITY_VIDEO_URL]: `Favor informar uma url válida`,
  [ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH]: `%{text} é um título de atividade inválido. Título de atividade deve ter entre %{min} e %{max} caracteres`,
  [ErrorMessagesLabels.ACTIVITY_INSTRUCTION_LENGTH]: `Instruções de atividade devem ter entre ${DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH} e ${DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH} caracteres`,
  [ErrorMessagesLabels.ACTIVITY_OPTION_SET]: `Resposta %{text} não é válida, dadas as opções fornecidas`,
  [ErrorMessagesLabels.CEFR]:
    "%{text} não é um CEFR válido. Valores permitidos são %{possibleValues}",
  [ErrorMessagesLabels.ACTIVITY_TIME_TO_COMPLETE]: `Invalid timeToComplete. Allowed values are numbers from ${DomainRules.ACTIVITY.MIN_TIME_TO_COMPLETE} to ${DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE}, expressed as minutes`,
  [ErrorMessagesLabels.INVITATION_TOKEN_NOT_FOUND]:
    "Token de convite não encontrado",
  [ErrorMessagesLabels.NO_STUDENT_ASSOCIATION]:
    "Não há estudante associado a este token de autenticação",
  [ErrorMessagesLabels.ASSOCIATION_DOESNT_BELONG]:
    "Este convite não pertence a este usuário",
  [ErrorMessagesLabels.ACTIVITY_NOT_FOUND]: "Atividade não encontrada",
  [ErrorMessagesLabels.EXISTING_ASSOCIATION]:
    "Este estudante já está associado a outro instrutor. Favor pedir para remover a associação",
};

export const PortugueseEmailStrings = {
  [EmailStringsLabels.ASSOCIATION_INVITATION]: (
    url: string,
    instructorName: string
  ) => `
  <p>Clique no link para se associar ao instrutor ${instructorName}: ${url}</p>,
`,
  [EmailStringsLabels.ASSOCIATION_INVITATION_SUBJECT]: (
    instructorName: string
  ) =>
    `Você acaba de ser convidado para se unir aos estudantes de ${instructorName}!`,
};
