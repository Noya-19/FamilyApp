const {User} = require('../models')
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
            console.log(creatingNewFamily)
            if (!creatingNewFamily) {
                const familyid = req.body.familyid
                const familyCheck = await Family.findOne({
                    where: {
                        id: familyid
                    }
                })
                console.log('familyCheck: ' + familyCheck)
                if (!familyCheck) {
                    console.log('invalid family code')
                    return res.status(403).send({
                        error: 'Error finding family.'
                    })
                } else {
                    const {user} = await User.create({
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    })
                    console.log('add user to family')
                    familyCheck.add(user)
                    //user.FamilyId = familyid
                }
            } else {
                const family = await Family.create()
                console.log('created family')
                res.send(family)
                const {user} = await User.create({
                    email: req.body.email,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                })
                family.add(user)
                console.log('created family - add user to family')
                //user.FamilyId = family.id
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
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
            res.send({
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