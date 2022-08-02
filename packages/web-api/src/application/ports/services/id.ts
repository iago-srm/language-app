import { IIdGenerator as ICommonIdGenerator } from "@language-app/common";

export interface IIdGenerator extends ICommonIdGenerator {
  getId: () => string;
}
