import "~style.css";

import { useEffect, useState } from "react";

import { getIsEnabled, setIsEnabled } from "~utils/storageHandler";

function IndexPopup() {
  const [isEnabled, setIsEnabledLocal] = useState<boolean>(true);

  const handleEnabledClick = async () => {
    const newState = !isEnabled;
    setIsEnabledLocal(newState);
    await setIsEnabled(newState);
  };

  const extensionId = chrome.runtime.id;

  useEffect(() => {
    const fetchEnabled = async () => {
      const enabled = await getIsEnabled();
      setIsEnabledLocal(enabled);
    };
    fetchEnabled();
  }, []);

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-64 plasmo-w-56 plasmo-flex-col plasmo-bg-slate-200">
      <h1 className="plasmo-text-lg">Jack's Website Blocker</h1>
      <button
        onClick={handleEnabledClick}
        className={`plasmo-w-24 plasmo-py-2 plasmo-text-lg plasmo-rounded-md plasmo-my-10 focus:plasmo-ring-4 focus:plasmo-ring-blue-400 ${isEnabled ? "plasmo-bg-green-500" : "plasmo-bg-red-500"}`}>
        {isEnabled ? `Unblock` : `Block`}
      </button>
      <a
        className="plasmo-bg-slate-900 plasmo-p-3 plasmo-text-white plasmo-rounded-md"
        target="_blank"
        href={`chrome-extension://${extensionId}/tabs/options.html`}>
        Options
      </a>
    </div>
  );
}

export default IndexPopup;
