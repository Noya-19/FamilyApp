module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })

  return Family
}