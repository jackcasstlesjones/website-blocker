import { Storage } from "@plasmohq/storage";

const storage = new Storage();

const seedStorage = async () => {
  await storage.set("websites", [
    {
      websiteName: "Founders and Coders",
      url: "foundersandcoders.com"
    },
    {
      websiteName: "Ebay",
      url: "ebay.co.uk"
    },
    {
      websiteName: "Asos",
      url: "asos.com"
    }
  ]);
};

const storageGetter = async () => {
  const data = await storage.get("websites"); // { color: "red" }
  return typeof data === "string" ? JSON.parse(data) : data;
};

const addToStorage = async (websiteName, url) => {
  const currentData = (await storage.get("websites")) || [];
  const newWebsite = { websiteName, url };
  const updatedData = [...currentData, newWebsite];
  await storage.set("websites", updatedData);
  return updatedData;
};

export { storageGetter, addToStorage };
