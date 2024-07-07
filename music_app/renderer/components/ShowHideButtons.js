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
        container.id = "sh-button-container"
        return container
    }

    static _addShowHideButton() {
        const button = createButton(`show-hide-button`, ["sh"], {}, "./images/visible-48.png", 24, 24)
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
            const downloadContainer = document.getElementById("download-bar-container")
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
            const downloadContainer = document.getElementById("download-bar-container")
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
            const downloadContainer = document.getElementById("download-bar-container")
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



function showHideAll() {
    const button = document.getElementById("show-hide-button")
    if (button.classList.contains("sh-active")) {
        hide()
    } else {
        show()
    }
}


function show() {
    const showHideButtons = document.getElementsByClassName("sh-btn")
    const containers = document.getElementsByClassName("show-hide-element-container")
    const downloadButton = document.getElementById("sh-download-button")
    const tagFilterButton = document.getElementById("sh-tag-button")
    const searchFilterButton = document.getElementById("sh-search-button")
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
            if (container.id === "download-container" && !downloadButton.classList.contains("sh-active")) {
                continue
            }
            if (container.id === "tag-filter-container" && !tagFilterButton.classList.contains("sh-active")) {
                continue
            }
            if (container.id === "search-filter-container" && !searchFilterButton.classList.contains("sh-active")) {
                continue
            }
            container.classList.remove("hidden")
            container.classList.add("visible")
        }
    }
}


function hide() {
    const showHideButtons = document.getElementsByClassName("sh-btn")
    const containers = document.getElementsByClassName("show-hide-element-container")
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