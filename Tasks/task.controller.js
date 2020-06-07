const task = require('./task.model')

module.exports = {
    addNewTask: async (req, res, next) => {
        const { description } = req.body

        try {
            const newTask = await task.create({ description, isComplete: false })

            res.status(200).json({ newTask })
        } catch (error) {
            return next(error)
        }
    },

    getAllTasks: async (req, res, next) => {
        try {
            const tasksToReturn = await task.find({})

            res.status(200).json({ tasksToReturn })

        } catch (error) {
            return next(error)
        }
    }
}