import { Message, VoiceChannel } from "discord.js";
import { dc } from "../../bot";
import { checkDungon } from "../../utils/checkPerms";
import { setState } from "../../utils/state";

let aliases = ['p']

async function run(message: Message, args: string[]) {
  const portal = dc.channels.cache.get(dc.state.get('portalId')) as VoiceChannel;
  const privateChan = dc.channels.cache.get(dc.state.get('portalPrivateId')) as VoiceChannel;
  if (!message.member) return;
  if (!portal) return;
  if (!checkDungon(message.member)) {
    message.reply('You do not have permission to use that command.');
    return;
  }
  if (args.join(' ') == 'open') {
    setState('portalState', 'true');
    message.reply('The Portal has been opened');
    let mems = portal.members;
    mems.forEach(e => {
      e.voice.setChannel(privateChan);
    });
  }
  else if (args.join(' ') == 'close') {
    setState('portalState', 'false');
    message.reply('The Portal has been closed');
  }
  else {
    message.reply('You must specify open or close');
  }
}

module.exports = {
  run,
  aliases
}