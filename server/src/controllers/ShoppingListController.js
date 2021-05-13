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
            const item = await ShoppingListItem.create(req.body)
            res.status(200).send(item)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the shopping list item.'
            })
        }
    },

    async deleteItem(req, res){
        try {
            console.log(req)
            await ShoppingListItem.destroy({
                where: {
                    FamilyId: req.query.FamilyId,
                    itemName: req.query.itemName
                }
            })
            res.status(200).send({
                statusText: 'Sucessfully deleted shopping list item.'
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while deleting shopping list item.'
            })
        }
    },
    async updateItemQuantity (req, res) {
        try {
            const newQuantity = req.query.quantity
            const item = await ShoppingListItem.findOne({ where: { FamilyId: req.query.FamilyId, itemName: req.query.itemName}})
            if (!item) {
                throw Error(`Item not updated. id:${req.query.id}`);
            }
            item.quantity = newQuantity;
            await item.save();
            res.status(200).send(item)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while updating the Item.'
            })
        }
    },

    async getFamilyRecipes (req, res) {
        try {
            const familyid = req.query[0]
            const familyRecipes = await ShoppingListRecipe.findAll({
                where: {
                    FamilyId: familyid
                }
            })
            res.send(familyRecipes)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while fetching shopping list Recipes.'
            })
        }
    },

    async postRecipe (req, res) {
        try {
            const recipe = await ShoppingListRecipe.create(req.body)
            res.status(200).send(recipe)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while creating the recipe.'
            })
        }
    },

    async deleteRecipe(req, res){
        try {
            await ShoppingListRecipe.destroy({
                where: {
                    FamilyId: req.query.FamilyId,
                    recipeName: req.query.recipeName
                }
            })
            res.status(200).send({
                statusText: 'Sucessfully deleted shopping list recipe.'
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while deleting shopping list recipe.'
            })
        }
    },
    async updateRecipe (req, res) {
        try {
            const newList = req.query.recipesList
            const recipe = await ShoppingListRecipe.findOne({ where: { FamilyId: req.query.FamilyId, recipeName: req.query.recipeName}})
            if (!recipe) {
                throw Error(`Item not updated. id:${req.query.id}`);
            }
            recipe.recipesList = newList;
            await recipe.save();
            res.status(200).send(recipe)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred while updating the Item.'
            })
        }
    },
}