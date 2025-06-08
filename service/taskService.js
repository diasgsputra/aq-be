const { sequelize, Task } = require('../models');

exports.createTask = async (name, description, status) => {
    return await Task.create({ name,description,status });
};

exports.getAllTasks = async (order) => {
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const taskQuery = `
        SELECT * FROM tasks ORDER BY createdAt ${sortOrder}
    `;

    return await sequelize.query(taskQuery, {
        type: sequelize.QueryTypes.SELECT,
    });
};

exports.getTaskById = async (id) => {
    const orderTypeQuery = `SELECT * FROM tasks where id = ${id}`;
    const orderTypes = await sequelize.query(orderTypeQuery, {
        type: sequelize.QueryTypes.SELECT,
    });

    return orderTypes[0]
};

exports.updateTaskById = async (id, name, description) => {
    const task = await Task.findOne({ where: { id: id } });
      if (!task) return null; 
  
      // Update nilai yang baru
      task.name = name || task.name;
      task.description = description || task.description;
  
      await task.save();
      return task;
};

exports.updateTaskStatusById = async (id, status) => {
    const task = await Task.findOne({ where: { id: id } });
      if (!task) return null; 
      task.status = status;
      await task.save();
      return task;
};

exports.deleteTaskById = async (id) => {
    try {
      const task = await Task.findOne({ where: { id: id } });
      if (!task) return null;
  
      await task.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

