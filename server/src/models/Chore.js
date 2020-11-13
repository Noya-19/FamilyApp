module.exports = (sequelize, DataTypes) => {
    const Chore = sequelize.define('Chore', {
        title: DataTypes.STRING,
        postedBy: DataTypes.STRING,
        created: DataTypes.DATE,
        dueDate: DataTypes.DATE,
    })

    return Chore
}
