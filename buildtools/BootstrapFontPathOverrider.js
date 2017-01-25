const fs = require("fs-extra");

module.exports = () => {
    fs.copySync('./node_modules/bootstrap/dist/fonts/','./assets/fonts/');

    return Promise.resolve();
}