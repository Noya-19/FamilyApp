module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        UserId: DataTypes.INTEGER,
        style: DataTypes.STRING
    })

    return Event
}
