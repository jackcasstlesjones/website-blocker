import { useEffect, useState } from "react";

import { clearWebsites, removeWebsite } from "~utils/storageHandler";

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
  const [isEnabled, setIsEnabledState] = useState<boolean>(true);

  // const handleClear = async () => {
  //   await clearWebsites();
  //   setData([]);
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("??askdfjasdkfjhs");
    console.log(data);
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

  const handleWebsiteRemove = async (index: number) => {
    await removeWebsite(index);
    const updatedData = await storageGetter();
    setData(updatedData);
    console.log(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const myData = await storageGetter();
      const enabled = await getIsEnabled();
      setData(myData);
      setIsEnabledState(enabled);
    };
    fetchData();
  }, []);

  return (
    <div className="plasmo-flex plasmo-justify-between">
      <div className="plasmo-flex plasmo-flex-col plasmo-justify-center plasmo-items-center plasmo-h-28-2 plasmo-bg-gray-100 plasmo-w-8/12">
        {/* <button */}
        {/*   onClick={handleEnabledClick} */}
        {/*   className={`plasmo-w-64 plasmo-h-40 plasmo-text-5xl plasmo-rounded-md plasmo-mt-10 plasmo-mb-10 focus:plasmo-ring-8 focus:plasmo-ring-blue-400 ${isEnabled ? "plasmo-bg-green-500" : "plasmo-bg-red-500"}`}> */}
        {/*   {isEnabled ? `Unblock` : `Block`} */}
        {/* </button> */}

        <h1 className="plasmo-text-5xl plasmo-text-center plasmo-mb-10">
          Options
        </h1>
        <div className="plasmo-bg-white plasmo-w-3/4 plasmo-py-10">
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="plasmo-gap-16 plasmo-justify-center plasmo-items-center plasmo-flex plasmo-p-5 plasmo-flex-col">
            <label className="plasmo-mt-10 plasmo-text-lg" htmlFor="url">
              Add a Website
            </label>
            <input
              value={websiteUrl}
              className="plasmo-border-b-2  plasmo-w-52 plasmo-text-lg"
              placeholder="reddit.com"
              name="url"
              type="text"
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />

            <button
              className="plasmo-bg-blue-600 plasmo-text-white plasmo-py-3 plasmo-px-5 plasmo-rounded-md plasmo-text-lg"
              type="submit">
              Add website
            </button>
          </form>
        </div>
        {/* <button */}
        {/*   onClick={handleClear} */}
        {/*   className="plasmo-bg-red-600 plasmo-text-white plasmo-p-5 plasmo-rounded-md plasmo-mt-4 plasmo-mb-10" */}
        {/*   type="button"> */}
        {/*   Clear All Blocked Websites */}
        {/* </button> */}
      </div>
      <div className="plasmo-shadow-lg plasmo-w-4/12 plasmo-h-screen">
        <p className="plasmo-my-10 plasmo-text-center plasmo-text-2xl">
          Currently blocked
        </p>
        <div className="plasmo-flex plasmo-flex-wrap  plasmo-gap-5 plasmo-bg-gray-200 plasmo-shadow-sm plasmo-p-10 plasmo-w-10/12 plasmo-m-auto plasmo-rounded-md">
          {data
            ? data.map((website, index) => {
                return (
                  <div className="plasmo-flex plasmo-gap-3 plasmo-bg-white plasmo-rounded-full plasmo-p-1">
                    <p className="plasmo-text-lg plasmo-pl-3" key={index}>
                      {website.url}
                    </p>
                    <button
                      onClick={async () => handleWebsiteRemove(index)}
                      className="plasmo-text-lg plasmo-px-2   ">
                      x
                    </button>
                  </div>
                );
              })
            : undefined}
        </div>
      </div>
    </div>
  );
}

export default OptionsPage;
