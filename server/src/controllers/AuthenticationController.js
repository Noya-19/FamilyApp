const {User} = require('../models')
const {Family} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const creatingNewFamily = req.body.creatingNewFamily
            if (!creatingNewFamily) {
                const familyid = req.body.familyid
                const family = await Family.findOne({
                    where: {
                        id: familyid
                    }
                })
                if (!family) {
                    return res.status(403).send({
                        error: 'Error finding family.'
                    })
                } else {
                    const user = await User.create({
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        FamilyId: req.body.familyid
                    })
                    const userJson = user.toJSON()
                    res.send({
                        user: userJson,
                        token: jwtSignUser(userJson)
                    })
                }
            } else {
                const user = await User.create({
                    email: req.body.email,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    FamilyId: null
                })
                const family = await Family.create()
                await user.update({
                    FamilyId: family.id
                })
                const userJson = user.toJSON()
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            }
        } catch (err) {
            res.status(400).send({
                error: 'This email is already in use.'
            })
            // email already exists
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect.'
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect.'
                })
            }

            const userJson = user.toJSON()
            res.status(200).send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to log in.'
            })
        }
    }
}