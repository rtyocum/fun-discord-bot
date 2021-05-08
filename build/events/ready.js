"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../bot");
const state_1 = require("../utils/state");
const event = 'ready';
async function run() {
    if (!bot_1.dc.user)
        return;
    bot_1.dc.user.setActivity('Commands', { type: 'LISTENING' });
    await state_1.updateCache();
    console.log(bot_1.dc.state);
}
module.exports = {
    event,
    run
};
//# sourceMappingURL=ready.js.map