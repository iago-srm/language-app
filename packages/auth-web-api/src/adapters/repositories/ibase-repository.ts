export interface IBaseCollection<P> {
  getOneById: (id: string) => Promise<P | undefined>;
  getOneByOwnField?: (field: string, value: string) => Promise<P | undefined>;
  getManyByIds?: (ids: string[]) => Promise<P[]>;
  getAll?: () => Promise<P[]>;
  getByFK?: (
    foreignTable: string,
    conditions: { foreignKey: string; value: string }[]
  ) => Promise<P[]>;
  insertOne: (entity: any) => Promise<boolean>;
  updateOne: (id: string, entity: Partial<P>) => Promise<boolean>;
  insertMany: (entities: P[]) => Promise<boolean>;
}

export interface IDatabase {
  connect: (connectionName?: string) => Promise<boolean>;
  closeConnection: () => Promise<boolean>;
  getCollection: <P>(collectionName: string) => IBaseCollection<P>;
}
