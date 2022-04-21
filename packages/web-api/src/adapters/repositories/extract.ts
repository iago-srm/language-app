import { IExtractRepository, ExtractDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from './ibase-repository';

export class ExtractRepository implements IExtractRepository {
  private readonly collection: IBaseCollection<ExtractDTO>;

  constructor({ db }: { db: IDatabase }) {
    this.collection = db.getCollection('extracts');
  }

  getById(extractId: string) {
    return this.collection.getOneById(extractId);
  }
  getAllFromUser(userId: string) {
    return this.collection.getByFK!('extracts', [
      { foreignKey: 'userId', value: userId },
    ]);
  }
  // async categorizeExtract(extractId: string, categoryId: string) {
  //     const result = await this.collection.updateOne(extractId, {
  //         categoryId
  //     });
  //     if(result) return true;
  //     return false;
  // }
  addExtracts(extracts: ExtractDTO[]) {
    return this.collection.insertMany(extracts);
  }

  getByCategoryId(categoryId: string) {
    return this.collection.getByFK!('extracts', [
      { foreignKey: 'categoryId', value: categoryId },
    ]);
  }
}

export default ExtractRepository;
