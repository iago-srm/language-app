const { pathsToModuleNameMapper } = require("ts-jest/utils");
const tsconfig = JSON.parse(
  require("fs").readFileSync(__dirname + "/tsconfig.json", "utf8")
);

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "src",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  // setupFilesAfterEnv: [
  // "<rootDir>/__test__/setup.ts"
  // ],
  setupFiles: ["dotenv/config"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: ["<rootDir>"],
  modulePathIgnorePatterns: ["__test__"],
  // testMatch: ['**/adapters/**/?(*.)+(spec).ts'],
};
