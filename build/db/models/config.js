"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const sequelize_1 = require("sequelize");
const bot_1 = require("../../bot");
exports.config = bot_1.db.define('config', {
    configName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    configValue: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
//# sourceMappingURL=config.js.map