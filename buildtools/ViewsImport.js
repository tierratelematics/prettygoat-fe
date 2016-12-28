const _ = require("lodash");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    let views = require('./RequireViews')({
        dirname: path.join(process.cwd(), "views"),
        filter: /(.+)\.tsx$/,
        map: function (name) {
            return name[0].toUpperCase() + name.slice(1);
        }
    });

    const exportFolder = path.join(process.cwd(), "views/export.js");
    process.env.EXPORT_VIEWS_PATH = exportFolder;
    fs.writeFileSync(exportFolder, 'module.exports = ' + JSON.stringify(views).replace(/"/gmi, ''));
    return Promise.resolve();
}