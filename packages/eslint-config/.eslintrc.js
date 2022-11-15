module.exports = {
  extends: ["next", "next/core-web-vitals", "prettier"],
  rules: {
    // "@typescript-eslint/no-empty-interface": "off"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
    next: {
      rootDir: "packages/web-app/",
    },
  },
};
