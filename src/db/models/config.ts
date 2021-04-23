import { DataTypes } from "sequelize";
import { db } from "../../bot";

export const config = db.define('config', {
  configName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  configValue: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},
  {
    freezeTableName: true,
    timestamps: false
  });