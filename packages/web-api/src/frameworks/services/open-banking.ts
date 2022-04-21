import { IOpenBankingService } from '@application/ports';
import { v4 as uuidv4 } from 'uuid';

export class OpenBankingService implements IOpenBankingService {
  getExtracts(_, lastExtractFetch: number) {
    if (Date.now() - lastExtractFetch > 30 * 60 * 1000)
      // a new extract every 30 minutes
      return new Promise<any[]>((r) =>
        r([
          {
            id: uuidv4(),
            description: 'mock description',
            amount: 17,
            timeStamp: Date.now(),
            type: 'debit',
          },
          {
            id: uuidv4(),
            description: 'mock description',
            amount: 110,
            timeStamp: Date.now(),
            type: 'credit',
          },
        ])
      );
    return new Promise<[]>((r) => r([]));
  }
}
