import { Storage } from "@plasmohq/storage";

import { getIsEnabled, setIsEnabled } from "~utils/storageHandler";

const storage = new Storage();

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-blocker") {
    const currentState = await getIsEnabled();
    await setIsEnabled(!currentState);
  }
});
