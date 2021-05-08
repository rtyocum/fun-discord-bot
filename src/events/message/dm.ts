import { Message, MessageEmbed } from "discord.js";

let event = 'message';

async function run(message: Message) {
  if (message.channel.type !== 'dm') return;
  if (message.author.bot) return;
  let embed = new MessageEmbed()
    .setTitle('Test Embed')
    .setFooter(message.author.tag, await message.author.displayAvatarURL());
  message.channel.send(embed);
}

module.exports = {
  event,
  run
};