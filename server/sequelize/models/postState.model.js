const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('PostState', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        stateDate:{
            allowNull: false,
            type: DataTypes.DATE
        },
        score: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total_comments: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        total_awards: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    });
};
