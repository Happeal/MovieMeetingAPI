var Sequelize = require('sequelize');

module.exports = (api) => {

    return api.mysql.define('meeting', {
        // fields
        idMeeting: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.DataTypes.STRING
        },
        meetingDate: {
            type: Sequelize.DataTypes.DATE
        },
        idMovie: {
            type: Sequelize.DataTypes.INTEGER
        },
        creationDate: {
            type: Sequelize.DataTypes.DATE
        }
    }, {
        // options
        freezeTableName: true,
        timestamps: false
    });

};