import { Activity, Auth, Home, Dashboard } from "./modules";
import errors from "./errors";
import pageNames from "./page-names";

export const Portuguese = {
  ...Activity,
  ...Auth,
  ...Dashboard,
  ...Home,
  ...errors,
  ...pageNames,
};
