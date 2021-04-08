const {ShoppingListItem} = require('../models')
const {ShoppingListRecipe} = require('../models')

module.exports = {
    async getFamilyItems (req, res) {
        try {
            const familyid = req.query.FamilyId
            const familyItems = await ShoppingListItem.findAll({
                where: {
                    FamilyId: familyid
                }
            })
            res.send(familyItems)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching shopping list items.'
            })
        }
    },
    async postItem (req, res) {
        try {
            console.log(req.body)
            const item = await ShoppingListItem.create(req.body)
            res.status(200).send(item)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the item.'
            })
        }
    },

    async postRecipe (req, res) {
        try {
            console.log(req.body)
            const recipe = await ShoppingListRecipe.create(req.body)
            res.status(200).send(recipe)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the recipe.'
            })
        }
    }
}