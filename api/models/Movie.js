
var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('movie', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vote_count: {
            type: Sequelize.DataTypes.INTEGER,
        },
        moviedb_id: {
            type: Sequelize.DataTypes.INTEGER,
        },
        video: {
            type: Sequelize.DataTypes.BOOLEAN
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
        backdrop_path: {
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
        
    });
};