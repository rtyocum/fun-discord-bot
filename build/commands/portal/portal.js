"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("../../bot");
const checkPerms_1 = require("../../utils/checkPerms");
const state_1 = require("../../utils/state");
let aliases = ['p'];
async function run(message, args) {
    const portal = bot_1.dc.channels.cache.get(bot_1.dc.state.get('portalId'));
    const privateChan = bot_1.dc.channels.cache.get(bot_1.dc.state.get('portalPrivateId'));
    if (!message.member)
        return;
    if (!portal)
        return;
    if (!checkPerms_1.checkDungon(message.member)) {
        message.reply('You do not have permission to use that command.');
        return;
    }
    if (args.join(' ') == 'open') {
        state_1.setState('portalState', 'true');
        message.reply('The Portal has been opened');
        let mems = portal.members;
        mems.forEach(e => {
            e.voice.setChannel(privateChan);
        });
    }
    else if (args.join(' ') == 'close') {
        state_1.setState('portalState', 'false');
        message.reply('The Portal has been closed');
    }
    else {
        message.reply('You must specify open or close');
    }
}
module.exports = {
    run,
    aliases
};
//# sourceMappingURL=portal.js.map