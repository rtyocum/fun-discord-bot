"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCache = exports.setState = void 0;
const bot_1 = require("../bot");
const config_1 = require("../db/models/config");
async function setState(key, value) {
    bot_1.dc.state.set(key, value);
    config_1.config.update({ configValue: value }, {
        where: {
            configName: key
        }
    });
}
exports.setState = setState;
async function updateCache() {
    bot_1.dc.state.clear();
    let updatedConfig = await config_1.config.findAll();
    updatedConfig.forEach(async (c) => {
        bot_1.dc.state.set(c.get('configName'), c.get('configValue'));
    });
}
exports.updateCache = updateCache;
//# sourceMappingURL=state.js.map