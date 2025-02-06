import { Storage } from "@plasmohq/storage";

import { getIsEnabled, storageGetter } from "../utils/storageHandler";

const storage = new Storage();

const urlChecker = async () => {
  const data = await storageGetter();
  const isEnabled = await getIsEnabled();

  if (!isEnabled) {
    return;
  }

  data.forEach((website) => {
    if (window.location.href.includes(website.url)) {
      window.location.href = "https://altl.io/";
    }
  });
};

urlChecker();

storage.watch({
  isEnabled: async (change) => {
    if (change.newValue) {
      await urlChecker();
    }
  },
  websites: async () => {
    await urlChecker();
  }
});
