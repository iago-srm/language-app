import {
  IDatabase,
  IBaseCollection,
  // ITest
} from "@adapters/repositories";
import { PrismaClient } from "@prisma/client";

export class PrismaDatabase extends IDBDatabase {

  _connection: PrismaClient;

  async connect() {
    try {
      this._connection = new PrismaClient();
      this._connection.$connect();
      return true;
    } catch(e) {
      console.error("failed to create connection",e)
      return false;
    }
  }
}
