const ViewImportTask = require('requireg')('smild/lib/tasks/extra/ViewImportTask');

module.exports = {
    "projectType": "frontend",
    "typescript": true,
    "test": "test/**/*.ts",
    "babel": false,
    "onPreBuild": [ViewImportTask]
};
