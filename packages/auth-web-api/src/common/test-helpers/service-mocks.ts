// import {
//   IUserRepository,
//   IVerificationTokenRepository,
//   IEncryptionService,
//   ITokenService,
//   IIdGenerator,
//   IEmailService
// } from '@application/ports';

// export class MockEncryptionService implements IEncryptionService {
//   public encrypt;
//   public compare;
//   constructor({
//     encrypt = jest.fn(),
//     compare = jest.fn()
//   }) {
//     this.encrypt = encrypt;
//     this.compare = compare;
//   }
// };

// export class MockTokenService implements ITokenService{
//   public verify;
//   public generate;
//   constructor ({
//     generate = jest.fn(),
//     verify = jest.fn(),
//   }) {
//     this.generate = generate;
//     this.verify = verify;
//   }
// };

// export class MockUserRepository implements IUserRepository {
//   public getUserById;
//   public getUserByEmail;
//   public updateUser;
//   public insertUser;

//   constructor ({
//     getUserById = jest.fn(),
//     getUserByEmail = jest.fn(),
//     updateUser = jest.fn(),
//     insertUser = jest.fn(),
//   }) {
//     this.getUserByEmail = getUserByEmail;
//     this.getUserById = getUserById;
//     this.insertUser = insertUser;
//     this.updateUser = updateUser;
//   }
// };

// export class MockVerificationTokenRepository implements IVerificationTokenRepository {
//   public getTokenByUserId;
//   public insertToken;

//   constructor({
//     getTokenByUserId = jest.fn(),
//     insertToken = jest.fn()
//   }) {
//     this.getTokenByUserId = getTokenByUserId;
//     this.insertToken = insertToken;
//   }
// }

// export class MockIdGenerator implements IIdGenerator {
//   public getId;
//   constructor ({
//     getId = jest.fn(),
//   }) {
//     this.getId = getId;
//   }
// }

// export class MockEmailService implements IEmailService {
//   public sendEmail;
//   constructor ({
//     sendEmail = jest.fn()
//   }) {
//     this.sendEmail = sendEmail;
//   }
// }
