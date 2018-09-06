
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('user', {
        idUser: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pseudo: {
            type: Sequelize.DataTypes.STRING,
        },
        encryptedPassword: {
            type: Sequelize.DataTypes.STRING
        },
        joinedOn: {
            type: Sequelize.DataTypes.DATEONLY
        },
        description: {
            type: Sequelize.DataTypes.STRING
        }
    },
    { // options
        freezeTableName: true,
        timestamps: false
    });
};