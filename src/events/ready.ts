import { dc, sb } from "../bot";
import { updateCache } from "../utils/state";

const event = 'ready';

async function run() {
  if (!dc.user) return;
  dc.user.setActivity('Commands', { type: 'LISTENING' });
  sb.setup();
  await updateCache();
  console.log(dc.state);
}

module.exports = {
  event,
  run
}