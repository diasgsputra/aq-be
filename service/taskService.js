const { sequelize, Task } = require('../models');

exports.createTask = async (name, description, status,rangking) => {
    return await Task.create({ name,description,status,rangking });
};

exports.getAllTasks = async (order) => {
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const taskQuery = `
        SELECT * FROM tasks ORDER BY ranking ${sortOrder}
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

exports.getMaxOrder = async () => {
    const maxQuery = `SELECT MAX(ranking)+1 FROM tasks`;
    const max = await sequelize.query(maxQuery, {
        type: sequelize.QueryTypes.SELECT,
    });

    return max[0]
};

exports.getCurrentRanking = async (id) => {
    const rankingQuery = `SELECT ranking FROM tasks WHERE id = :id`;
    const ranking = await sequelize.query(rankingQuery, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });

    return ranking[0];
};

exports.updateOrder = async (id,currentRanking,expectedRanking) => {
    return await sequelize.transaction(async (t) => {
    if (currentRanking > expectedRanking) {
      await sequelize.query(
        `UPDATE tasks
         SET ranking = ranking + 1
         WHERE ranking >= :expectedRanking AND ranking < :currentRanking`,
        {
          replacements: { expectedRanking, currentRanking },
          transaction: t,
        }
      );
    } else if (currentRanking < expectedRanking) {
      await sequelize.query(
        `UPDATE tasks
         SET ranking = ranking - 1
         WHERE ranking > :currentRanking AND ranking <= :expectedRanking`,
        {
          replacements: { expectedRanking, currentRanking },
          transaction: t,
        }
      );
    }

    await sequelize.query(
      `UPDATE tasks
       SET ranking = :expectedRanking
       WHERE id = :id`,
      {
        replacements: { id, expectedRanking },
        transaction: t,
      }
    );

    return true;
  });
};

exports.updateTaskById = async (id, name, description) => {
    const task = await Task.findOne({ where: { id: id } });
      if (!task) return null; 
  
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

