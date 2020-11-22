const { Chore } = require('../models')

module.exports = {
    async getAllByAssignedTo (req, res) {
        try {
            const userid = req.body.UserId
            const chores = await Chore.findAll({
                where: {
                    assignedTo: userid    
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
            const chore = await Chore.create(req.body)
            res.status(200).send(chore)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the chore.'
            })
        }
    },
    async delete (req, res) {
        try {
            const choreid = req.body.id
            const chore = await Chore.findOne({
                where: {
                    id: choreid 
                }
            })
            res.send(chores)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching chores.'
            })
        }
    }
}