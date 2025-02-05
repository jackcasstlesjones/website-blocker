import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const storageGetter = async () => {
  await storage.set("websites", [
    {
      websiteName: "Founders and Coders",
      url: "foundersandcoders.com"
    },
    {
      websiteName: "Ebay",
      url: "ebay.co.uk"
    }
  ])
  const data = await storage.get("websites") // { color: "red" }
  return typeof data === "string" ? JSON.parse(data) : data
}

export { storageGetter }
