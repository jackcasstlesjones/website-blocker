export default function addWebsite(userName: string, userUrl: string) {
  const fs = require("fs")

  // Read the current JSON data
  fs.readFile("data/websites.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err)
      return
    }

    // Parse the JSON string into an object (array)
    const websites = JSON.parse(data)

    // Add a new item to the array
    websites.push({ name: userName, url: userUrl })

    // Write the updated array back to the file
    fs.writeFile(
      "data/websites.json",
      JSON.stringify(websites, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to the file", err)
          return
        }
        console.log("Item added successfully!")
      }
    )
  })
}
