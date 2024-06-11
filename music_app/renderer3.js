
//import { Body } from "./rdr/body.js"
//import { ContentLoader } from "./rdr/contentLoader.js"


const body = new Body()
const contentLoader = new ContentLoader()


document.addEventListener("DOMContentLoaded", () => {
    document.appendChild(body.makeElement())
    contentLoader.loadContentDomLoaded()
})
