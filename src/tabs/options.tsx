import { useEffect, useState } from "react";

import "~/style.css";

import addWebsite from "~utils/addWebsite";
// import data from "../data/websites.json";
import { addToStorage, storageGetter } from "~utils/storageHandler";

function OptionsPage() {
  const [data, setData] = useState();
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [websiteName, setWebsiteName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (websiteName && websiteUrl) {
      await addToStorage(websiteName, websiteUrl);
      const updatedData = await storageGetter();
      setData(updatedData);
      setWebsiteName("");
      setWebsiteUrl("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const myData = await storageGetter();
      setData(myData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>I am the options page</h1>
      <h2>Hear me roar</h2>
      <p>The websites you are currently blocking are:</p>
      {data
        ? data.map((website) => {
            return <p>{website.url}</p>;
          })
        : undefined}
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="plasmo-gap-5 plasmo-justify-center plasmo-items-center plasmo-flex plasmo-p-5 plasmo-flex-col">
        <label htmlFor="websiteName">
          Enter a nickname for the website you want to block
        </label>
        <input
          value={websiteName}
          className="plasmo-border-2 plasmo-border-black plasmo-w-52"
          name="websiteName"
          type="text"
          onChange={(e) => setWebsiteName(e.target.value)}
        />
        <label htmlFor="url">
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
    </div>
  );
}

export default OptionsPage;
