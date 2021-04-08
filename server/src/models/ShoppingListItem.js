module.exports = (sequelize, DataTypes) => {
    const ShoppingListItem = sequelize.define('ShoppingListItem', {
        itemName: DataTypes.STRING,
        quantity:DataTypes.INTEGER,
        inEditMode: DataTypes.BOOLEAN,
        FamilyId: DataTypes.INTEGER
    })

    return ShoppingListItem
}