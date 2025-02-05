import data from "../data/websites.json"

console.log(window.location.href)

data.forEach((website) => {
  if (window.location.href.includes(website.url)) {
    window.location.href = "https://viatora.co.uk"
  }
})
