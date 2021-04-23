"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundBoard = void 0;
const discord_js_1 = require("discord.js");
const bot_1 = require("../bot");
const checkPerms_1 = require("../utils/checkPerms");
class SoundBoard {
    async setup(member) {
        if (member) {
            if (!checkPerms_1.checkAdmin(member))
                return;
        }
        const { soundboard } = require('../db/models/soundboard');
        this.sounds = await soundboard.findAll();
        let fields = [];
        this.sounds.forEach(async (sound) => {
            fields.push({
                name: sound.get('Name'),
                value: sound.get('Value'),
                inline: true
            });
        });
        const embed = new discord_js_1.MessageEmbed()
            .setTitle('SoundBoard List')
            .setColor('#FF3131')
            .addFields(fields)
            .setThumbnail('https://cdn.dribbble.com/users/1614722/screenshots/4419914/soundboard_animatie__zwart__still_2x.gif')
            .setFooter('Click a reaction button to play a clip or ❌ to leave');
        let chan = bot_1.dc.channels.cache.get('832338903624843305');
        let msg = await chan.send(embed);
        this.msgID = msg.id;
        this.sounds.forEach(async (sound) => {
            msg.react(sound.get('Value'));
        });
        msg.react('❌');
    }
    async join(member) {
        const chanId = member.voice.channelID;
        if (!chanId)
            return;
        const chan = bot_1.dc.channels.cache.get(chanId);
        this.conn = await chan.join();
        this.conn.on('disconnect', () => {
            this.conn = undefined;
        });
    }
    async play(member, sound) {
        if (!this.conn) {
            await this.join(member);
        }
        this.disp = this.conn?.play(sound, { volume: 0.5 });
        if (!this.disp)
            return;
        this.disp.on('finish', () => {
            this.disp?.destroy();
            this.disp = undefined;
        });
    }
    async stop() {
        this.disp?.pause();
    }
    async leave() {
        if (this.conn) {
            this.conn.disconnect();
            this.conn = undefined;
        }
    }
}
exports.SoundBoard = SoundBoard;
//# sourceMappingURL=SoundBoard.js.map