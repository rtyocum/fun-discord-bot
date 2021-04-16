import { DataTypes } from "sequelize";
import { db } from "../../bot";

const soundboard = db.define('soundboard', {
  Name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  File: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},
  {
    freezeTableName: true,
    timestamps: false
  });