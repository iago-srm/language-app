import { PrismaClient } from '@prisma/client';
import { Prisma } from 'prisma';
import {
  IDatabase,
  IBaseCollection,
  // ITest
} from "@adapters/repositories";
// this is a workaround described in this issue: https://github.com/prisma/prisma/issues/5273

type Dict = { [k: string]: any }

type DictWithId = {
  id?: Id
  [k: string]: any
}

type SelectWithId = {
  id?: boolean
  [k: string]: any
}

type Id = string | Prisma.StringFilter;

type Delegate = {
  findMany: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    where?: Dict
    orderBy?: Prisma.Enumerable<any>
    cursor?: Dict
    take?: number
    skip?: number
    distinct?: Prisma.Enumerable<any>
  }) => any,

  findFirst: (arg: {
    select?: SelectWithId | null
    rejectOnNotFound?: Prisma.RejectOnNotFound
    include?: Dict | null
    where?: DictWithId
    orderBy?: Prisma.Enumerable<any>
    cursor?: Dict
    take?: number
    skip?: number
    distinct?: Prisma.Enumerable<any>
  }) => any,

  create: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    data: any
  }) => any,

  // createMany: (arg: {
  //   skipDuplicates?: boolean
  //   data: any
  // }) => any,

  update: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    data: any,
    where: DictWithId
  }) => any,

  delete: (arg: {
    select?: SelectWithId | null
    include?: Dict | null
    where: DictWithId
  }) => any,

  [k: string]: any
}

type FindManyWhereArg<T extends Delegate> = Parameters<T['findMany']>[0]['where']
type FindFirstWhereArg<T extends Delegate> = Parameters<T['findFirst']>[0]['where']
type CreateDataArg<T extends Delegate> = Parameters<T['create']>[0]['data']
type UpdateDataArg<T extends Delegate> = Parameters<T['update']>[0]['data']


class PrismaDatabase implements IDatabase {
  _connection: PrismaClient;

  async connect() {
    try {
      this._connection = new PrismaClient();
      this._connection.user.create
      await this._connection.$connect()
      return true;
    } catch(e) {
      console.error("failed to create connection",e)
      return false;
    }
  }

  async closeConnection() {
    try {
      await this._connection.$disconnect();
      return true;
    } catch {
      return false;
    }
  }

  getCollection<P>(collectionName: string) {
    const prisma = this._connection;

    const db = {
      user: new PrismaCollection<typeof prisma.user>()
    }

    return prisma[collectionName];

  }
}
class PrismaCollection <T extends Delegate> implements IBaseCollection<T>{
  delegate: T

  getMany (where: FindManyWhereArg<T>) {
    return this.delegate.findMany({ where })
  }

  getOne (where: FindFirstWhereArg<T>) {
    return this.delegate.findFirst({ where })
  }

  getOneById (id: any) {
    return this.delegate.findFirst({ where: { id } })
  }

  insertOne (data: CreateDataArg<T>) {
    return this.delegate.create({ data })
  }// if you pass multiple nested creates (of relations), if one insertion fails, none happens

  insertMany (data: CreateDataArg<T>[]) {
    return this.delegate.createMany({ data })
  }

  updateOne (id: Id, data: UpdateDataArg<T>) {
    return this.delegate.update({ data, where: { id } })
  }

  delete (id: Id) {
    return this.delegate.delete({ where: { id } })
  }
}
