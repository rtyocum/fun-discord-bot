import { dc } from "../bot";
import { config } from "../db/models/config";

export async function setState(key: string, value: string) {
  dc.state.set(key, value);
  config.update({ configValue: value }, {
    where: {
      configName: key
    }
  });
}


export async function updateCache() {
  dc.state.clear();
  let updatedConfig = await config.findAll();
  updatedConfig.forEach(async (c) => {
    dc.state.set(c.get('configName') as string, c.get('configValue') as string);
  });
}