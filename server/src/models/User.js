const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        FamilyId: DataTypes.INTEGER
    }, {
        hooks: {
            beforeSave: hashPassword
        },
        getterMethods: {
            firstName() {
                return this.firstname;
            },
            lastName() {
                return this.lastname;
            },
            userId() {
                return this.id;
            }
        },
        setterMethods: {
            setFamilyId(familyid) {
                this.setDataValue('FamilyId', familyid);
            }
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return User
}
