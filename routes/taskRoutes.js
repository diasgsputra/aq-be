const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('', taskController.readAllTask);
router.post('', taskController.createTask);
router.get('/:id', taskController.readTaskById);
router.put('/:id', taskController.updateTaskById);
router.put('/status/:id', taskController.updateTaskStatusById);
router.delete('/:id', taskController.deleteTaskById);
router.post('/move-order', taskController.moveOrder);

module.exports = router;