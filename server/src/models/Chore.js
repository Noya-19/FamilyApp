module.exports = (sequelize, DataTypes) => {
    const Chore = sequelize.define('Chore', {
        title: DataTypes.STRING,
        dueDate: DataTypes.DATEONLY,
        assignedTo: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    })

    return Chore
}
