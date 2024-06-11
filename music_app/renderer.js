
//import { Body } from "./rdr/body.js"
//import { ContentLoader } from "./rdr/contentLoader.js"


const main = new Main()
const contentLoader = new ContentLoader()


document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body")
    body.appendChild(main.makeElement())
    contentLoader.loadContentDomLoaded()
})
