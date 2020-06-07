const router = require('express').Router()
const taskController = require('./task.controller')

router.get('/', taskController.getAllTasks)
router.post('/', taskController.addNewTask)

module.exports = router
