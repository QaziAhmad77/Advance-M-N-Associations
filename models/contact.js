const moment = require('moment');
module.exports = (sequelize,DataTypes) => {
const Contact = sequelize.define("contacts",{
    permanent_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    current_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    father_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // Other model options go here
    // tableName: "users"
    // timestamps: false
})

Contact.beforeCreate(async(contact) => {
    contact.dataValues.createdAt = moment().unix();
    contact.dataValues.updatedAt = moment().unix();
  });
  Contact.beforeUpdate(async(contact) => {
    contact.dataValues.updatedAt = moment().unix();
  });
return Contact;
}