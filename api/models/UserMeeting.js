var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('usermeeting', {
    }, {
        // options
        freezeTableName: true,
        timestamps: false
    });

};