"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soundboard = void 0;
const sequelize_1 = require("sequelize");
const bot_1 = require("../../bot");
exports.soundboard = bot_1.db.define('soundboard', {
    Name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    Value: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    File: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
//# sourceMappingURL=soundboard.js.map