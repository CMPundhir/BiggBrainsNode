import { Sequelize } from "sequelize";
import myDb from "../database/db.js";

const User = myDb.define("user", {
  // Column-1, user_id is an object with
  // properties like type, keys,
  // validation of column.
  id: {
    // Sequelize module has INTEGER Data_Type.
    type: Sequelize.INTEGER,

    // To increment user_id automatically.
    autoIncrement: true,

    // user_id can not be null.
    allowNull: false,

    // For uniquely identify user.
    primaryKey: true,
  },

  // Column-2, name
  name: { type: Sequelize.STRING, allowNull: false },

  // Column-3, email
  email: { type: Sequelize.STRING, allowNull: false },

  // Column-4, default values for
  // mob => mobile number
  mob: { type: Sequelize.STRING },

  // Column-5, default values for
  // password => bcrypt password
  psw: { type: Sequelize.STRING },

  // Column-6, default values for
  // password => jwt token
  token: { type: Sequelize.STRING },

  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default User;
