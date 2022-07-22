import { Sequelize } from "sequelize";
import myDb from "../database/db.js";

const Enquiry = myDb.define("enquiry", {
  // Column-1, user_id is an object with
  // properties like type, keys,
  // validation of column.
  enquiry_id: {
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
  // dates => current time
  mob: { type: Sequelize.STRING },

  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default Enquiry;
