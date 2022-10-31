const fse = require("fs-extra");
const path = require("path");
const topDir = __dirname;
const webAppPublicTinyMce = path.join(topDir, "public", "tinymce");
fse.emptyDirSync(webAppPublicTinyMce);
fse.copySync(
  path.join(topDir, "..", "..", "node_modules", "tinymce"),
  webAppPublicTinyMce,
  { overwrite: true }
);
