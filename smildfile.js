const ViewsImport = require("./buildtools/ViewsImport");
const BootstrapFontPathOverrider = require("./buildtools/BootstrapFontPathOverrider");

module.exports = {
        "projectType": "frontend",
        "revisionExclude": "*",
        "preBuild": () => Promise.all([ViewsImport(),BootstrapFontPathOverrider()])
        };