import green16 from "url:../assets/greenCircle16x16.png";
import green32 from "url:../assets/greenCircle32x32.png";
import red16 from "url:../assets/redCircle16x16.png";
import red32 from "url:../assets/redCircle32x32.png";

import { Storage } from "@plasmohq/storage";

import { getIsEnabled, setIsEnabled } from "~utils/storageHandler";

const storage = new Storage();

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-blocker") {
    const currentState = await getIsEnabled();
    await setIsEnabled(!currentState);
  }
});

const changeIcon = async () => {
  const isEnabled = await getIsEnabled();
  console.log(`is enabled: ${isEnabled}`);
  if (isEnabled) {
    console.log("I am enabled");
    chrome.action.setIcon({
      path: {
        16: red16,
        32: red32
      }
    });
  } else if (!isEnabled) {
    console.log("I am not");
    chrome.action.setIcon({
      path: {
        16: green16,
        32: green32
      }
    });
  }
};

changeIcon();

storage.watch({
  isEnabled: async () => {
    await changeIcon();
  }
});
