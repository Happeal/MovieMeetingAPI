
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('movie', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'idMovie'
        },
        vote_count: {
            type: Sequelize.DataTypes.INTEGER,
        },
        moviedb_id: {
            type: Sequelize.DataTypes.INTEGER,
        },
        vote_average: {
            type: Sequelize.DataTypes.DOUBLE
        },
        title: {
            type: Sequelize.DataTypes.STRING
        },
        popularity: {
            type: Sequelize.DataTypes.DOUBLE
        },
        poster_path: {
            type: Sequelize.DataTypes.STRING
        },
        original_language: {
            type: Sequelize.DataTypes.STRING
        },
        adult: {
            type: Sequelize.DataTypes.BOOLEAN
        },
        overview: {
            type: Sequelize.DataTypes.STRING
        },
        release_date: {
            type: Sequelize.DataTypes.DATEONLY
        }
    },
    { // options
        freezeTableName: true,
        timestamps: false
    });
};