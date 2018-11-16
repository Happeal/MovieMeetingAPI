var Sequelize = require('sequelize');

module.exports = (api) => {
    return api.mysql.define('MovieGenre', {
        idMovie: {
            type: Sequelize.INTEGER,
            field: 'idMovie'
        },
        idGenre: {
            type: Sequelize.DataTypes.INTEGER,
            field: 'idGenre'
        }
    },
    { // options
        freezeTableName: true,
        timestamps: false
    });
};