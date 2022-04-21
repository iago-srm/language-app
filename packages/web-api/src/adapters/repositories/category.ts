import { ICategoryRepository, CategoryDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from './ibase-repository';

export class CategoryRepository implements ICategoryRepository {
  private readonly collection: IBaseCollection<CategoryDTO>;

  constructor({ db }: { db: IDatabase }) {
    this.collection = db.getCollection('categories');
  }

  getAllFromUser(userId: string) {
    return this.collection.getByFK!('categories', [
      { foreignKey: 'userId', value: userId },
    ]);
  }
  getByNameFromUser(userId: string, categoryName: string) {
    return this.collection.getByFK!('categories', [
      { foreignKey: 'userId', value: userId },
      { foreignKey: 'name', value: categoryName },
    ]);
  }
  async updateCategory(category: Partial<CategoryDTO>) {
    const result = await this.collection.updateOne(category);
    if (result) return true;
    return false;
  }

  getById(categoryId: string) {
    return this.collection.getOneById(categoryId);
  }
}

export default CategoryRepository;
