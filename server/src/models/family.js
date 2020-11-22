module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

  }, {
    getterMethods: {
      getFamilyId() {
        return this.id;
      }
    }
  })
  
  return Family
}