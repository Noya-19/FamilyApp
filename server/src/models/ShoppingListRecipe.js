module.exports = (sequelize, DataTypes) => {
    const ShoppingListRecipe = sequelize.define('ShoppingListRecipe', {
        recipeName: DataTypes.STRING,
        recipesList: DataTypes.JSON,
        FamilyId: DataTypes.INTEGER
    })

    return ShoppingListRecipe
}