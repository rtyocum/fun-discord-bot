import { VoiceState } from "discord.js";
import { dc } from "../../bot";

let event = 'voiceStateUpdate';

async function run(_oldState: VoiceState, newState: VoiceState) {
  const portal = dc.channels.cache.get(dc.state.get('portalId'));
  const privateChan = dc.channels.cache.get(dc.state.get('portalPrivateId'));
  if (!portal) return;
  if (newState.channelID != portal.id) return;
  if (dc.state.get('portalState') !== 'true') return;
  if (typeof privateChan === 'undefined') return;
  newState.setChannel(privateChan);
}

module.exports = {
  event,
  run
}