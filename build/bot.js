"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sb = exports.dc = void 0;
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const DiscordClient_1 = require("./classes/DiscordClient");
const SoundBoard_1 = require("./classes/SoundBoard");
const registry_1 = require("./utils/registry");
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
exports.dc = new DiscordClient_1.DiscordClient();
exports.sb = new SoundBoard_1.SoundBoard();
exports.db = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: path_1.default.join(__dirname, '..', 'db.sqlite3')
});
registry_1.registerEvents();
registry_1.registerCommands();
registry_1.registerHooks();
exports.dc.login(process.env.BOT_TOKEN);
//# sourceMappingURL=bot.js.map