import path from 'path';
import { Sequelize } from 'sequelize';
import { DiscordClient } from './classes/DiscordClient';
import { SoundBoard } from './classes/SoundBoard';
import { registerCommands, registerEvents, registerHooks } from './utils/registry';
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

export const dc: DiscordClient = new DiscordClient();
export const sb: SoundBoard = new SoundBoard();
export const db: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite3')
});
registerEvents();
registerCommands();
registerHooks();

dc.login(process.env.BOT_TOKEN);