import axios from "axios";
import { Message, MessageEmbed } from "discord.js";


async function run(message: Message, _args: string[]) {
  const { data: json } = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
  if (message.mentions.everyone === true) {
    const embed = new MessageEmbed()
      .setTitle(`Insult #${json.number}`)
      .setDescription(`@everyone ${json.insult}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL() as string);
    message.channel.send(embed);
    message.delete();
  }
  else if ((message.mentions.users.size !== 0) || (message.mentions.roles.size !== 0)) {
    let roles = async function getRoles(): Promise<string[]> {
      let role: string[] = [];
      await message.mentions.roles.forEach(r => {
        role.push(`<@&${r.id}>`);
      });
      return role;
    }
    let users = async function getUsers(): Promise<string[]> {
      let user: string[] = [];
      await message.mentions.users.forEach(u => {
        user.push(`<@!${u.id}>`);
      });
      return user;
    }
    let roleArr = await roles();
    let userArr = await users();
    let mentions = roleArr.concat(userArr);
    let mentionString = mentions.join(' ');
    const embed = new MessageEmbed()
      .setTitle(`Insult #${json.number}`)
      .setDescription(`${mentionString} ${json.insult}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL() as string);
    message.channel.send(embed);
    message.delete();
  }
  else {
    message.reply('No user was given');
  }
}

module.exports = {
  run
}