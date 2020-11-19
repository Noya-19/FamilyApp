module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        postedBy: DataTypes.INTEGER
    })

    return Event
}
