import { IUserRepository, UserDTO } from '@application/ports';
import { IBaseCollection, IDatabase } from './ibase-repository';

export class UserRepository implements IUserRepository {
  private readonly collection: IBaseCollection<UserDTO>;

  constructor({ db }: { db: IDatabase }) {
    this.collection = db.getCollection('users');
  }

  getUserById(userId: string) {
    return this.collection.getOneById(userId);
  }
  getUserByEmail(email: string) {
    return this.collection.getOneByOwnField('email', email);
  }
  insertUser(user: UserDTO) {
    return this.collection.insertOne(user);
  }
  async updateUser(user: UserDTO) {
    const result = await this.collection.updateOne(user);
    if (result) return true;
    return false;
  }
}

export default UserRepository;
