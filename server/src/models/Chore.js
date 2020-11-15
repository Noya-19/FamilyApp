module.exports = (sequelize, DataTypes) => {
    const Chore = sequelize.define('Chore', {
        title: DataTypes.STRING,
        dueDate: DataTypes.DATE,
    })

    return Chore
}
