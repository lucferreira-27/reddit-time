const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Post', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        postId: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                // Reddit post id rules are only use letters and numbers. Min 3.
                is: /^\w{3,}$/
            }
        },
        comunityName:{
            allowNull: false,
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['recent_posted', 'pending_tracking','tracking' ,'post_deleted'],
            defaultValue: 'pending_tracking',
        },
        autoTracking:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    });
};
