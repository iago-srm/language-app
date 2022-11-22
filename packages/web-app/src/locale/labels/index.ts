import * as Modules from "./modules";
import errors from "./errors";
import pageNames from "./page-names";

export const Labels = {
  ...Modules,
  ...errors,
  ...pageNames,
};
