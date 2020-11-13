const {Chore} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const chores = Chore.findAll({
                where: {}
            })
            res.send(chores)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching chores.'
            })
        }
    },
    async post (req, res) {
        try {
            const chore = Chore.create(req.body)
            res.send(chore)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the chore.'
            })
        }
    },
}