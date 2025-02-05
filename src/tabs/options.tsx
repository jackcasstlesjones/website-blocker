import { useState } from "react"

import "~/style.css"

import addWebsite from "~utils/addWebsite"

import data from "../data/websites.json"

function OptionsPage() {
  const [websiteUrl, setWebsiteUrl] = useState<string>("")
  const [websiteName, setWebsiteName] = useState<string>("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault() // Prevent the form from reloading the page

    // Call the addWebsite function with the provided name and URL
    if (websiteName && websiteUrl) {
      addWebsite(websiteName, websiteUrl)
    }
  }

  return (
    <div>
      <h1>I am the options page</h1>
      <h2>Hear me roar</h2>
      <p>The websites you are currently blocking are:</p>
      {data.map((website) => {
        return <p>{website.url}</p>
      })}
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="plasmo-gap-5 plasmo-justify-center plasmo-items-center plasmo-flex plasmo-p-5 plasmo-flex-col">
        <label htmlFor="websiteName">
          Enter a nickname for the website you want to block
        </label>
        <input
          className="plasmo-border-2 plasmo-border-black plasmo-w-52"
          name="websiteName"
          type="text"
          onChange={(e) => setWebsiteName(e.target.value)}
        />
        <label htmlFor="url">
          Enter the base URL of the website you want to block
        </label>
        <input
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
  )
}

export default OptionsPage
