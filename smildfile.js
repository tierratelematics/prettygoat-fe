const ViewsImport = require("./buildtools/ViewsImport");

module.exports = {
        "projectType": "frontend",
        "revisionExclude": "*",
        "preBuild": () = > ViewsImport()
};