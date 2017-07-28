const smildExtra = require("smild-extra");
const bootstrapFontPathOverrider = require("./buildtools/BootstrapFontPathOverrider");

module.exports = {
    "projectType": "frontend",
    "revisionExclude": "*",
    "preBuild": () => Promise.all([smildExtra.ViewsImport(), bootstrapFontPathOverrider()])
};