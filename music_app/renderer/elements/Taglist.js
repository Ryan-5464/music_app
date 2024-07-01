// import { dataController } from "../../renderer.js"
// import { channels } from "../../renderer.js"



// export class TaglistController {



//     static async loadTaglist(trackId) {
//         await dataController.updateTagData(trackId)
//         const taglist = Taglist.create(dataController.tagData, trackId)
//         taglist.classList.add("taglist-display")
//         return taglist
//     }




// }



// class Taglist {

//     static create(tags, trackId) {
//         const container = this._addContainer()
//         container.appendChild(CreateTagElement.create(trackId))
//         container.appendChild(TaglistElement.create(tags, trackId))
//         return container
//     }

//     static _addContainer() {
//         const container = document.createElement("div")
//         container.id = "taglist-container"
//         return container
//     }

// }



// class CreateTagElement {

//     static create(trackId) {
//         const container = this._addContainer()
//         container.appendChild(this._addCreateTagInput())
//         container.appendChild(this._addCreateTagButton(trackId))
//         return container
//     }

//     static _addContainer() {
//         const container = document.createElement("div")
//         container.id = "taglist-create-tag-container"
//         return container
//     }

//     static _addCreateTagInput() {
//         const element = document.createElement("input")
//         element.id = "create-tag-input"
//         element.classList.add("input-bar")
//         element.placeholder = "Enter tag name..."
//         return element
//     }

//     static _addCreateTagButton(trackId) {
//         const button = createButton("create-tag-button", ["active-button"], {"data-track-id": trackId}, "./images/plus-32.png", 24, 24)
//         button.classList.add("nav-button")
//         button.addEventListener("click", async () => {
//             const addTagInput = document.getElementById("create-tag-input")
//             const tagName = addTagInput.value
//             await channels.addTagChannel.send({trackId: trackId, tagName: tagName})
//             const taglist = document.getElementById("taglist")
//             taglist.appendChild(TagElement.create(tagName, trackId))
//         })
//         return button
//     }

// }



// class TaglistElement {

//     static create(tags, trackId) {
//         const container = this._addContainer()
//         for (const tag of tags) {
//             container.appendChild(TagElement.create(tag.tag, trackId))
//         }
//         return container 
//     }

//     static _addContainer() {
//         const container = document.createElement("div")
//         container.id = "taglist"
//         return container
//     }
// }



// class TagElement {

//     static create(tagName, trackId) {
//         const container = this._addContainer(trackId)
//         container.appendChild(this._addTagName(tagName))
//         container.appendChild(this._addDeleteButton(trackId, tagName))
//         return container 
//     }

//     static _addContainer(trackId) {
//         const container =  document.createElement("div")
//         container.setAttribute("data-track-id", trackId)
//         container.classList.add("tag")
//         return container
//     }

//     static _addTagName(tagName) {
//         const element = document.createElement("div")
//         element.classList.add("tag-name")
//         element.textContent = tagName
//         return element
//     }

//     static _addDeleteButton(trackId, tagName) {
//         const button = createButton(null, ["delete-tag-button"], {"data-track-id": trackId, "data-tag-name": tagName}, "./images/delete-32.png", 14, 14)
//         button.addEventListener("click", async () => {
//             await channels.deleteTagChannel.send({trackId: trackId, tagName: tagName})
//             button.parentElement.remove()
//         })
//         return button
//     }

// }

