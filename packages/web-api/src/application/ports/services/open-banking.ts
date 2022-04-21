export interface IOpenBankingService {
  getExtracts: (cpf: string, lastLogin: number) => Promise<any[]>;
}
