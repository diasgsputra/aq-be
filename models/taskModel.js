const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Task = sequelize.define('tasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.BOOLEAN, allowNull: false },
        ranking: { type: DataTypes.INTEGER, allowNull: false }
    });
    return Task;
};