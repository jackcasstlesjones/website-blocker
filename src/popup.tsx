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

  useEffect(() => {
    const fetchEnabled = async () => {
      const enabled = await getIsEnabled();
      setIsEnabledLocal(enabled);
    };
    fetchEnabled();
  }, []);

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-28 plasmo-w-56 plasmo-flex-col plasmo-bg-slate-100">
      <h1 className="plasmo-text-lg plasmo-mb-3">Jack's Website Blocker</h1>
      <button
        onClick={handleEnabledClick}
        className={`plasmo-w-64 plasmo-h-64 plasmo-text-5xl plasmo-rounded-full plasmo-my-24 focus:plasmo-ring-8 focus:plasmo-ring-blue-400 ${isEnabled ? "plasmo-bg-green-500" : "plasmo-bg-red-500"}`}>
        {isEnabled ? `Unblock` : `Block`}
      </button>
      <a
        className="plasmo-bg-blue-600 plasmo-p-3 plasmo-text-white plasmo-rounded-md"
        target="_blank"
        href="chrome-extension://npcfjbmndnhebnfdipfegbhcgmpfonjd/tabs/options.html">
        Click here to go to options
      </a>
    </div>
  );
}

export default IndexPopup;
