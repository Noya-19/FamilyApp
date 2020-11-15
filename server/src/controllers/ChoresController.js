const {Chore} = require('../models')

module.exports = {
    async getAllByUserID (req, res) {
        try {
            const {userid} = req.body
<<<<<<< HEAD
            const {chores} = await Chore.findAll({
                where: {
                    UserId: userid,
                    assignedTo: userid
                }
            })
            .then(function (data) {
                res.send(data)
            })
=======
            const chores = await Chore.findAll({
                where: {
                    userid: userid
                }
            })
            res.send(chores)
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching chores.'
            })
        }
    },
    async post (req, res) {
        try {
            const chore = await Chore.create(req.body)
            res.send(chore)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the chore.'
            })
        }
    },
}