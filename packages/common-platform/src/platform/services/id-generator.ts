import { v4 as uuidv4 } from "uuid";
import { IIdGenerator } from "../ports";

export class IdGenerator implements IIdGenerator {
  getId() {
    return uuidv4();
  }
}
