"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkPerms_1 = require("../../utils/checkPerms");
const state_1 = require("../../utils/state");
async function run(message, args) {
    let prefix = args.join(' ');
    if (!message.member)
        return;
    if (!checkPerms_1.checkAdmin(message.member)) {
        message.reply('You do not have sufficient permissions');
        return;
    }
    if (args.length == 0) {
        message.reply('No prefix was given');
        return;
    }
    state_1.setState('prefix', prefix);
    message.reply('The prefix has been updated');
}
module.exports = {
    run
};
//# sourceMappingURL=prefix.js.map