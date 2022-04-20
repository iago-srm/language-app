import {
  IDatabase,
  IBaseCollection,
  // ITest
} from "@adapters/repositories";
import { createConnection, Connection, Repository, DeepPartial } from "typeorm";

export class TypeORMDatabase implements IDatabase {
  connection: Connection;
  _dbConnectionName: string;

  constructor({ dbConnectionName }) {
    this._dbConnectionName = dbConnectionName;
  }
  async connect() {
    try {
      this.connection = await createConnection(this._dbConnectionName || 'development');
      return true;
    } catch(e) {
      console.error("failed to create connection",e)
      return false;
    }
  }

  async closeConnection() {
    try {
      await this.connection.close();
      return true;
    } catch {
      return false;
    }
  }

  getCollection<P>(collectionName: string): TypeORMCollectionAdapter<P> {
    const repository = this.connection.getRepository<P>(collectionName);
    return new TypeORMCollectionAdapter<P>(repository);
  }
}

class TypeORMCollectionAdapter<P> implements IBaseCollection<P> {
  constructor(private repository: Repository<P>) {}

  async getOneById(id: string) {
    if(!id) {
      throw Error("Null id was passed");
    }
    const response = await this.repository.findOne(id);
    return response;
  }

  async getOneByOwnField(field: string, value: string) {
    const response = await this.repository.findOne({ [field]: value });
    return response;
  }

  async getManyByIds(ids: string[]) {
    return this.repository.findByIds(ids) // does this fail if one id is not found?
  }

  getAll() {
    return this.repository.find();
  }

  async insertOne(data: DeepPartial<P>) {
    const result = await this.repository.save(data);
    return result ? true : false;
  }

  async updateOne(data: any) {
    const result = await this.repository.save(data);
    return result ? true : false;
  }

  getByFK(foreignTable: string, conditions: { foreignKey: string, value: string }[]) {
    const query = `SELECT * FROM ${foreignTable} where ${conditions.map((condition,i, conditions) => i < conditions.length-1 ? `${condition.foreignKey} = \'${condition.value}\' AND` : `${condition.foreignKey} = \'${condition.value}\'`).join(" ")}`;
    // console.log({query})
    return this.repository.query(query)
  }

  async insertMany(entities: P[]) {
    // const result = await this.repository.save(entities);
    // return result ? true : false;
    return true;
  }

  async deleteAll() {
    await this.repository.query(`DELETE from ${this.repository.metadata.tableName}`);
  }
}
