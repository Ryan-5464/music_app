export class ShowHideButtons {

    static create() {
        const container = ShowHideButtons._addContainer()
        container.appendChild(ShowHideButtons._addShowHideButton())
        container.appendChild(ShowHideButtons._addDownloadButton())
        container.appendChild(ShowHideButtons._addTagFilterButton())
        container.appendChild(ShowHideButtons._addSearchButton())
        return container
    }

    static _addContainer() {
        const container = document.createElement("div")
        return container
    }

    static _addShowHideButton() {
        const button = createButton(`show-hide-button`, ["sh"], {}, "./images/home-7-128.png", 24, 24)
        button.addEventListener("click", () => {
            button.classList.toggle("sh")
            button.classList.toggle("sh-active")
            showHideAll()
        })
        return button
    }

    static _addDownloadButton() {
        const button = createButton(`sh-download-button`, ["sh","sh-active", "sh-btn"], {}, "./images/download-2-32.png", 24, 24)
        button.addEventListener("click", () => {
            removeActive()
            button.classList.add("sh-active")
            const downloadContainer = document.getElementById("download-container")
            const tagFilterContainer = document.getElementById("tag-filter-container")
            const searchFilterContainer = document.getElementById("search-filter-container")
            downloadContainer.classList.add("visible")
            downloadContainer.classList.remove("hidden")
            tagFilterContainer.classList.add("hidden")
            tagFilterContainer.classList.remove("visible")
            searchFilterContainer.classList.add("hidden")
            searchFilterContainer.classList.remove("visible")
        })
        return button
    }

    static _addTagFilterButton() {
        const button = createButton(`sh-tag-button`, ["sh", "sh-btn"], {}, "./images/tag-5-32.png", 24, 24)
        button.addEventListener("click", () => {
            removeActive()
            button.classList.add("sh-active")
            const downloadContainer = document.getElementById("download-container")
            const tagFilterContainer = document.getElementById("tag-filter-container")
            const searchFilterContainer = document.getElementById("search-filter-container")
            downloadContainer.classList.remove("visible")
            downloadContainer.classList.add("hidden")
            tagFilterContainer.classList.remove("hidden")
            tagFilterContainer.classList.add("visible")
            searchFilterContainer.classList.add("hidden")
            searchFilterContainer.classList.remove("visible")
        })
        return button
    }

    static _addSearchButton() {
        const button = createButton(`sh-search-button`, ["sh", "sh-btn"], {}, "./images/search-4-32.png", 24, 24)
        button.addEventListener("click", () => {
            removeActive()
            button.classList.add("sh-active")
            const downloadContainer = document.getElementById("download-container")
            const tagFilterContainer = document.getElementById("tag-filter-container")
            const searchFilterContainer = document.getElementById("search-filter-container")
            downloadContainer.classList.remove("visible")
            downloadContainer.classList.add("hidden")
            tagFilterContainer.classList.add("hidden")
            tagFilterContainer.classList.remove("visible")
            searchFilterContainer.classList.remove("hidden")
            searchFilterContainer.classList.add("visible")
        })
        return button
    }

}



function removeActive() {
    const buttons = document.getElementsByClassName("sh-btn")
    for (const button of buttons) {
        button.classList.remove("sh-active")
    }
}





function handleToggle(button, elementId) {
    const element = document.getElementById(elementId)
    toggleVisibility(button, element)
}




function toggleVisibility(button, element) {
    console.log("button", button)
    if (element.classList.contains("visible")) {
        button.classList.remove("sh-active")
        button.classList.add("sh")
        element.classList.remove("visible")
        element.classList.add("hidden")
    } else {
        button.classList.remove("sh")
        button.classList.add("sh-active")
        element.classList.add("visible")
        element.classList.remove("hidden")
    }
        
}



function showHideAll() {
    const showHideButtons = document.getElementsByClassName("sh-btn")
    const containers = document.getElementsByClassName("element-container")
    const button = document.getElementById("show-hide-button")
    if (button.classList.contains("sh-active")) {
        for (const btn of showHideButtons) {
            btn.classList.remove("visible")
            btn.classList.add("hidden")
        }
        for (const container of containers) {
            container.classList.remove("visible")
            container.classList.add("hidden")
        }
    } else {
        for (const btn of showHideButtons) {
            btn.classList.remove("hidden")
            btn.classList.add("visible")
        }
        for (const container of containers) {
            container.classList.remove("hidden")
            container.classList.add("visible")
        }
    }
}
