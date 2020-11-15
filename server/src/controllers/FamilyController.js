const {Family} = require('../models')

module.exports = {
    async getFamilyUsers (req, res) {
        try {
            const {familyid} = req.body
            const users = await User.findAll({
                where: {
                    familyid: familyid
                }
            })
            res.send(users)
            .then(function (data) {
                res.send(data)
            })
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