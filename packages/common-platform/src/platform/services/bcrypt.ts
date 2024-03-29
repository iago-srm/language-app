import { IEncryptionService } from "../ports";
import bcrypt from "bcryptjs";

export class BCryptEncryptionService implements IEncryptionService {
  _saltRounds = 10;

  encrypt(plain: string) {
    try {
      return bcrypt.hash(plain, this._saltRounds);
    } catch {
      throw new Error("Error trying to encrypt password");
    }
  }

  compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
