// import { IDatabase, IBaseCollection } from '@adapters/repositories';
// import { ILogger } from '@common/logger';

// export class InMemoryDatabase implements IDatabase {
//     _db: {
//         [key: string]: InMemoryCollection<any>;
//     };
//     _connectionName: string;
//     _logger: ILogger;

//     constructor({ dbConnectionName, logger }) {
//         this._connectionName = dbConnectionName;
//         this._logger = logger;
//     }

//     connect() {
//         this._logger.info(
//             'connection to ' + this._connectionName + ' database successful'
//         );

//         this._db = {
//             users: new InMemoryCollection([]),
//             categories: new InMemoryCollection([]),
//             extracts: new InMemoryCollection([])
//         };

//         return new Promise<boolean>((resolve) => resolve(true));
//     }

//     closeConnection() {
//         this._db = {};
//         return new Promise<boolean>((resolve) => resolve(true));
//     }

//     getCollection(collectionName: string) {
//         if (!this._db) return new InMemoryCollection([]);
//         return this._db[collectionName];
//     }
// }

// class InMemoryCollection<P> implements IBaseCollection<P> {
//     constructor(private repository: P[]) {}

//     // TODO: test if this promise throws when rejected (search object with non-existing id)
//     getOneById(id: string) {
//         return new Promise<P>((resolve, reject) => {
//             const entity = this.repository.find((el) => {
//                 return (el as { [k: string]: any }).id === id;
//             });
//             if (!entity) {
//                 reject(`Object with id ${id} not found`);
//                 return;
//             }
//             resolve(entity);
//         });
//     }

//     getOneByOwnField(field: string, value: string) {
//         return new Promise<P>((resolve, reject) => {
//             const entity = this.repository.find((el) => {
//                 return (el as { [k: string]: any })[field] === value;
//             });
//             if (!entity) {
//                 reject(`Object with ${field} ${value} not found`);
//                 return;
//             }
//             resolve(entity);
//         });
//     }

//     getManyByIds(ids: string[]) {
//         return new Promise<P[]>(resolve => resolve(this.repository.filter(item => ids.includes((item as unknown as {id:string}).id))));
//     }
//     getAll() {
//         return new Promise<P[]>((resolve) => resolve(this.repository));
//     }

//     // getByFK() {

//     // }
//     insertOne(data: P) {
//         this.repository.push(data);
//         return new Promise<boolean>((resolve) => resolve(true));
//     }

//     updateOne(id: string, entity: P) {
//         return new Promise<P>((resolve, reject) => {
//             const entityIndex = this.repository.findIndex((el) => {
//                 return (el as { [k: string]: any }).id === id;
//             });
//             if (entityIndex === -1) {
//                 reject(`Object with id ${id} not found`);
//                 return;
//             }
//             this.repository[entityIndex] = entity;
//             resolve(entity);
//         });
//     }

//     // getManyByOwnField(field: string, value: string) {
//     //     return new Promise<P[]>(resolve => resolve(this.repository.filter(entry => entry[field] === value)))
//     // }

//     // getManyByRelationField(field: string, value: string) {
//     //     // TODO
//     //     return new Promise<P[]>(resolve => resolve(this.repository.filter(entry => entry[field] === value)))
//     // }

//     insertMany(entities: P[]) {
//         this.repository.push(...entities);
//         return new Promise<boolean>(r => r(true));
//     }
// }
