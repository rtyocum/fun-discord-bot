"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
async function run(message, _args) {
    const { data: json } = await axios_1.default.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    if (message.mentions.everyone === true) {
        message.channel.send(`@everyone ${json.insult}`);
    }
    else if ((message.mentions.users.size !== 0) || (message.mentions.roles.size !== 0)) {
        let roles = async function getRoles() {
            let role = [];
            await message.mentions.roles.forEach(r => {
                role.push(`<@&${r.id}>`);
            });
            return role;
        };
        let users = async function getUsers() {
            let user = [];
            await message.mentions.users.forEach(u => {
                user.push(`<@!${u.id}>`);
            });
            return user;
        };
        let roleArr = await roles();
        let userArr = await users();
        let mentions = roleArr.concat(userArr);
        let mentionString = mentions.join(' ');
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Insult #${json.number}`)
            .setDescription(`${mentionString} ${json.insult}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL());
        let ping = await message.channel.send(mentionString);
        message.channel.send(embed);
        message.delete();
        ping.delete();
    }
    else {
        message.reply('No user was given');
    }
}
module.exports = {
    run
};
//# sourceMappingURL=insult.js.map