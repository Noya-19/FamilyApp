const {Family} = require('../models')
const {User} = require('../models')
const {Chore} = require('../models')

module.exports = {
    async getFamilyUsers (req, res) {
        try {
            const familyid = req.body.FamilyId
            const users = await User.findAll({
                where: {
                    FamilyId: familyid
                }
            })
            res.send(users)
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