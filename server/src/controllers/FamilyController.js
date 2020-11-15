const {Family} = require('../models')

module.exports = {
    async getFamilyUsers (req, res) {
        try {
            const {FamilyId} = req.body
            const users = await User.findAll({
                where: {
                    FamilyId: FamilyId
                }
            })
            res.send(users)
<<<<<<< HEAD
            .then(function (data) {
                res.send(data)
            })
=======
>>>>>>> 77f015ff5cdd211a053c8888cfc299b15c244db9
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching users.'
            })
        }
    },
    async post (req, res) {
        try {
            const family = await Family.create(req.body)
            res.send(family)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the family.'
            })
        }
    },
}