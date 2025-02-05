// import data from "../data/websites.json"
import { storageGetter } from "../utils/storageHandler";

console.log(window.location.href);
// console.log(storageGetter())
const logger = async () => {
  const data = await storageGetter();
  console.log(data);
  data.forEach((website) => {
    console.log(website.url);
    if (window.location.href.includes(website.url)) {
      window.location.href = "https://altl.io/";
    }
  });
};
logger();
