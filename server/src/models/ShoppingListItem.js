module.exports = (sequelize, DataTypes) => {
    const ShoppingListItem = sequelize.define('ShoppingListItem', {
        itemName: DataTypes.STRING,
        itemQuantity:DataTypes.INTEGER,
        inEditMode: DataTypes.BOOLEAN,
        FamilyId: DataTypes.INTEGER
    })

    return ShoppingListItem
}