module.exports = (sequelize, DataTypes) => {
    const ShoppingListRecipe = sequelize.define('ShoppingListRecipe', {
        recipeName: DataTypes.STRING,
        recipeList: DataTypes.JSON,
        FamilyId: DataTypes.INTEGER
    })

    return ShoppingListRecipe
}