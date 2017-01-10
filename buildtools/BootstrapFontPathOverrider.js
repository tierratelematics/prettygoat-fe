const fs = require("fs-extra");

module.exports = () => {
    fs.copy('./node_modules/bootstrap/dist/fonts/','./assets/fonts/');

    return Promise.resolve();
}