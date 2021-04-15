"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../bot");
const event = 'ready';
async function run() {
    if (!bot_1.dc.user)
        return;
    bot_1.dc.user.setActivity('Commands', { type: 'LISTENING' });
    bot_1.sb.setup();
}
module.exports = {
    event,
    run
};
//# sourceMappingURL=ready.js.map