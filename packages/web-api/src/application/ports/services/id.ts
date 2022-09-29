import { IIdGenerator as ICommonIdGenerator } from "@language-app/common-platform";

export interface IIdGenerator extends ICommonIdGenerator {
  getId: () => string;
}
