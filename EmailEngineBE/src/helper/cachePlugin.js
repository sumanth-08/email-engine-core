import { promises as fs } from "fs";
import path from "path";
const __dirname = path.resolve();

const cacheFilePath = path.join(__dirname, "./tokenCache.json");

const cachePlugin = {
  async beforeCacheAccess(myCache) {
    try {
      const cacheData = await fs.readFile(cacheFilePath, "utf-8");
      myCache.tokenCache.deserialize(cacheData);
    } catch (err) {
      myCache.tokenCache.deserialize("{}");
    }
  },

  async afterCacheAccess(myCache) {
    if (myCache.cacheHasChanged) {
      try {
        await fs.writeFile(cacheFilePath, myCache.tokenCache.serialize(), "utf-8");
      } catch (err) {
        console.error(err.message);
      }
    }
  },
};

export default cachePlugin;
