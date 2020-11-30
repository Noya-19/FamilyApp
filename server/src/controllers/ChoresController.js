const { Chore } = require('../models')

module.exports = {
    async getAllByAssignedTo (req, res) {
        try {
            const userid = req.query.UserId
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
            const choreid = req.query.choreid
            await Chore.destroy({
                where: {
                    id: choreid
                }
            })
            res.status(200).send({
                statusText: 'Sucessfully deleted chore.'
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while deleting chore.'
            })
        }
    },
    async updateChore (req, res) {
        try {
            const isCompleteReq = req.query.isComplete
            const chore = await Chore.findOne({ where: { id: req.query.id}})
            if (!chore) {
                throw Error(`Chore not updated. id:${id}`);
            }
            chore.isComplete = isCompleteReq;
            await chore.save();
            res.status(200).send(isCompleteReq)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while updating the chore.'
            })
        }
    },
}
