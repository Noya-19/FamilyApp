const {Chore} = require('../models')

module.exports = {
    async getAllByFamilyID (req, res) {
        try {
            const {familyid} = req.body
            const chores = await Chore.findAll({
                where: {
                    familyid: familyid
                }
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