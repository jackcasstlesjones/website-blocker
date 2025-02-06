import { useEffect, useState } from "react";

import { clearWebsites } from "~utils/storageHandler";

import "~/style.css";

import {
  addToStorage,
  getIsEnabled,
  setIsEnabled,
  storageGetter
} from "~utils/storageHandler";

interface Website {
  url: string;
}

function OptionsPage() {
  const [data, setData] = useState<Website[]>();
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  // const [websiteName, setWebsiteName] = useState<string>("");
  const [isEnabled, setIsEnabledState] = useState<boolean>(true);

  const handleClear = async () => {
    await clearWebsites();
    setData([]); // Clear the local state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("??askdfjasdkfjhs");
    if (websiteUrl) {
      await addToStorage(websiteUrl);
      const updatedData = await storageGetter();
      setData(updatedData);
      setWebsiteUrl("");
    }
  };

  const handleEnabledClick = async () => {
    const newState = !isEnabled;
    setIsEnabledState(newState);
    await setIsEnabled(newState);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [myData, enabled] = await Promise.all([
        storageGetter(),
        getIsEnabled()
      ]);
      setData(myData);
      setIsEnabledState(enabled);
    };
    fetchData();
  }, []);

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center plasmo-h-28-2">
      <button
        onClick={handleEnabledClick}
        className={`plasmo-w-64 plasmo-h-64 plasmo-text-5xl plasmo-rounded-full plasmo-my-24 focus:plasmo-ring-8 focus:plasmo-ring-blue-400 ${isEnabled ? "plasmo-bg-green-500" : "plasmo-bg-red-500"}`}>
        {isEnabled ? `Unblock` : `Block`}
      </button>
      <h1 className="plasmo-text-5xl plasmo-text-center plasmo-mb-10">
        Options
      </h1>
      <p className="plasmo-text-lg plasmo-mb-2">
        The websites you are currently blocking are:
      </p>
      {data
        ? data.map((website, index) => {
            return <p key={index}>{website.url}</p>;
          })
        : undefined}
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="plasmo-gap-5 plasmo-justify-center plasmo-items-center plasmo-flex plasmo-p-5 plasmo-flex-col">
        <label className="plasmo-mt-10" htmlFor="url">
          Enter the base URL of the website you want to block
        </label>
        <input
          value={websiteUrl}
          className="plasmo-border-2 plasmo-border-black plasmo-w-52"
          name="url"
          type="text"
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <button
          className="plasmo-bg-green-600 plasmo-text-white plasmo-p-5 plasmo-rounded-md"
          type="submit">
          Add website
        </button>
      </form>
      <button
        onClick={handleClear}
        className="plasmo-bg-red-600 plasmo-text-white plasmo-p-5 plasmo-rounded-md plasmo-mt-4"
        type="button">
        Clear All Blocked Websites
      </button>
    </div>
  );
}

export default OptionsPage;
