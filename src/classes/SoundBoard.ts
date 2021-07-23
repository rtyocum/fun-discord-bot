import { GuildMember, MessageEmbed, StreamDispatcher, TextChannel, VoiceChannel, VoiceConnection } from "discord.js";
import { Model, ModelCtor } from "sequelize/types";
import { dc } from "../bot";
import { Field } from "../interfaces/Sound";
import { checkAdmin } from "../utils/checkPerms";

export class SoundBoard {
  public conn?: VoiceConnection;
  public disp?: StreamDispatcher;
  public msgID?: string;
  public sounds?: Model<any, any>[];
  public interval?: NodeJS.Timeout;
  async setup(member?: GuildMember) {
    if (member) {
      if (!checkAdmin(member)) return;
    }
    const { soundboard }: { soundboard: ModelCtor<Model<any, any>> } = require('../db/models/soundboard');
    this.sounds = await soundboard.findAll();
    let fields: Field[] = [];
    this.sounds.forEach(async (sound: Model) => {
      fields.push({
        name: sound.get('Name') as string,
        value: sound.get('Value') as string,
        inline: true
      })
    });
    const embed = new MessageEmbed()
      .setTitle('SoundBoard List')
      .setColor('#FF3131')
      .addFields(fields)
      .setThumbnail('https://cdn.dribbble.com/users/1614722/screenshots/4419914/soundboard_animatie__zwart__still_2x.gif')
      .setFooter('Click a reaction button to play a clip or ❌ to leave');
    let chan = dc.channels.cache.get(dc.state.get('soundboardId')) as TextChannel;
    let msg = await chan.send(embed);
    this.msgID = msg.id;
    this.sounds.forEach(async (sound) => {
      msg.react(sound.get('Value') as string);
    });
    msg.react('❌');
  }

  async join(member: GuildMember) {
    const chanId = member.voice.channelID;
    if (!chanId) return;
    const chan = dc.channels.cache.get(chanId) as VoiceChannel;
    this.conn = await chan.join();
    this.conn.on('disconnect', () => {
      this.conn = undefined;
      clearInterval(this.interval as NodeJS.Timeout);
    })
  }

  async play(member: GuildMember, sound: string) {
    if (!this.conn) {
      await this.join(member);
    }
    if (this.interval) {
      console.log('clear')
      clearInterval(this.interval as NodeJS.Timeout);
    }
    this.disp = this.conn?.play(sound, { volume: 0.5 });
    console.log('start');
    if (!this.disp) return;
    this.disp.on('finish', () => {
      this.disp?.destroy();
      this.disp = undefined;
      console.log('finish');
      this.interval = setInterval(async () => {
        if (this.conn) {
          this.conn.disconnect();
          this.conn = undefined;
        }
        clearInterval(this.interval as NodeJS.Timeout);
      }, 900000);
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
    clearInterval(this.interval as NodeJS.Timeout);
  }
}