import type { PlasmoCSConfig } from "plasmo"

import data from "../data/websites.json"

// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   run_at: "document_end",
//   all_frames: false
// }

console.log(window.location.href)

data.forEach((website) => {
  if (window.location.href.includes(website.url)) {
    window.location.href = "https://portfoliowithbeans.netlify.app"
  }
})
