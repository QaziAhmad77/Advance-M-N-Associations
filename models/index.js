const { Sequelize, DataTypes } = require('sequelize');
const employee = require('./employee');
const contact = require('./contact');

const sequelize = new Sequelize("test","root","",{
    host: "localhost",
    // logging: false, This will remove all the queries from the terminal when we are running .
    logging: false,
    dialect: "mysql"
});

try{
    sequelize.authenticate();
    console.log("Connected to database successfully");
}catch(error){
    console.log("Failed to connect to database",error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize,DataTypes);
db.employee = require('./employee')(sequelize,DataTypes);
db.employeeContacts = require('./employeeContact')(sequelize,DataTypes,employee,contact);
db.customer = require('./customer')(sequelize,DataTypes);
db.profile = require('./profile')(sequelize,DataTypes);

const Customer_Profile = sequelize.define('Customer_Profile', {
    selfGranted: DataTypes.BOOLEAN,
}, { timestamps: false ,
}); // is k liye hm aleda file b banasakte he or ye hm ne createdAt or updatedAt ko khatam karne k liye use kia he 
db.customer.belongsToMany(db.profile, {through: 'Customer_Profile'});
db.profile.belongsToMany(db.customer, {through: 'Customer_Profile'});

db.employee.belongsToMany(db.contact, {through: db.employeeContacts});
db.contact.belongsToMany(db.employee, {through: db.employeeContacts});

db.player = sequelize.define('Player', {status: DataTypes.BOOLEAN});
db.team = sequelize.define('Team', {name: DataTypes.STRING});
db.game = sequelize.define('Game', {name: DataTypes.STRING});

db.sequelize.sync({ force: false});
module.exports = db;