import { Storage } from "@plasmohq/storage";

const storage = new Storage();

const storageGetter = async () => {
  const data = await storage.get("websites");
  return typeof data === "string" ? JSON.parse(data) : data;
};

const addToStorage = async (url) => {
  const currentData = (await storage.get("websites")) || [];
  const newWebsite = { url };
  const updatedData = [...currentData, newWebsite];
  await storage.set("websites", updatedData);
  return updatedData;
};

const setIsEnabled = async (enabled: boolean) => {
  await storage.set("isEnabled", enabled);
};

const getIsEnabled = async (): Promise<boolean> => {
  const enabled = await storage.get<boolean>("isEnabled");
  return enabled ?? true;
};

const clearWebsites = async () => {
  await storage.set("websites", []);
  return [];
};

const removeWebsite = async (index) => {
  const currentArray = (await storage.get<any[]>("websites")) || [];
  currentArray.splice(index, 1);
  await storage.set("websites", currentArray);
  console.log(index);
};

export {
  storageGetter,
  addToStorage,
  setIsEnabled,
  getIsEnabled,
  clearWebsites,
  removeWebsite
};
