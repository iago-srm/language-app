import { Activity, Auth, Home } from "./modules";
import errors from "./errors";
import pageNames from "./page-names";

export const Portuguese = {
  ...Activity,
  ...Auth,
  ...Home,
  ...errors,
  ...pageNames,
};
