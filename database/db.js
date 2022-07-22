import Sequelize from "sequelize";

// Creating new Object of Sequelize
const myDb = new Sequelize("biggbrains_db", "root", "", {
  // Explicitly specifying
  // mysql database
  dialect: "mysql",

  // By default host is 'localhost'
  host: "localhost",
});

// Exporting the sequelize object.
// We can use it in another file
// for creating models
//module.exports = sequelize;

export default myDb;
