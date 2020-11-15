const {Chore} = require('../models')

module.exports = {
    async getAllByUserID (req, res) {
        try {
            const {userid} = req.body
            const {chores} = await Chore.findAll({
                where: {
                    UserId: userid,
                    assignedTo: userid
                }
            })
            .then(function (data) {
                res.send(data)
            })
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