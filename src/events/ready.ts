import { dc, sb } from "../bot";

const event = 'ready';

async function run() {
  if (!dc.user) return;
  dc.user.setActivity('Commands', { type: 'LISTENING' });
  sb.setup();
}

module.exports = {
  event,
  run
}