import { Activity, Auth, Home } from "./modules";
import errors from "./errors";
import pageNames from "./page-names";

export const Labels = {
  ...Activity,
  ...Auth,
  ...Home,
  ...errors,
  ...pageNames,
};
