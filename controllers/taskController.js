const taskService = require('../service/taskService');

exports.createTask = async (req, res) => {
    try {
        const { name,description } = req.body;
        const status = false
        const max = await taskService.getMaxOrder();
        await taskService.createTask(name,description,status,max.ranking);

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.readAllTask = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        const response = tasks.map(task => ({
            id: task.id,
            name: task.name,
            description: task.description,
            status: task.status
        }));

        res.json({ data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.readTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const task = await taskService.getTaskById(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const response = {
            id: task.id,
            name: task.name,
            description: task.description,
            status: task.status
        };

        res.json({ data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTaskById= async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description} = req.body;
      console.log("masuk sini")
  
      const updatedTask = await taskService.updateTaskById(id, name, description);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task tidak ditemukan!" });
      }
  
      res.json({ message: "Task berhasil diperbarui", data: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengupdate task' });
    }
  }

exports.updateTaskStatusById= async (req, res) => {
    try {
      const { id } = req.params;
      const { status} = req.body;
  console.log("status di controller: ",status)
      const updatedTask = await taskService.updateTaskStatusById(id, status);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task tidak ditemukan!" });
      }
  
      res.json({ message: "Status berhasil diperbarui", data: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengupdate task' });
    }
  }

exports.deleteTaskById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const isDeleted = await taskService.deleteTaskById(id);
      if (!isDeleted) {
        return res.status(404).json({ message: "Task tidak ditemukan!" });
      }
  
      res.json({ message: "Task berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal menghapus task' });
    }
  }


  exports.moveOrder = async (req, res) => {
    try {
      const { id,ranking } = req.body;
      const currentRanking = await taskService.getCurrentRanking(id)
      const moveRanking = await taskService.updateOrder(id, currentRanking.ranking,ranking);
    
  
      res.json({ message: "Urutan berhasil diperbarui"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengupdate urutan' });
    }
  }
