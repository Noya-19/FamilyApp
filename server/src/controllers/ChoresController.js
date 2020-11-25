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
<<<<<<< HEAD
            const choreid = req.body.id
            const chore = await Chore.findOne({
=======
            const choreid = req.query.choreid
            await Chore.destroy({
>>>>>>> 9bfaac7193cea24725499120499faa8e30750dff
                where: {
                    id: choreid 
                }
            })
<<<<<<< HEAD
            res.send(chores)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching chores.'
=======
            res.status(200).send({
                statusText: 'Sucessfully deleted chore.'
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while deleting chore.'
>>>>>>> 9bfaac7193cea24725499120499faa8e30750dff
            })
        }
    }
}
