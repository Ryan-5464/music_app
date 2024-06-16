class TagFilter {

    makeElement() {
        const element = document.createElement("div")
        element.id = "tag-filter"
        element.appendChild(this.addFilterInput())
        element.appendChild(this.addAnyButton())
        element.appendChild(this.addAllButton())
        element.appendChild(this.addTagFilterText())
        return element
    }

    addFilterInput() {
        const element = document.createElement("input")
        element.id = "tag-filter-input"
        element.classList.add("input-bar")
        element.classList.add("input-box")
        return element
    }

    addAnyButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-any-button"
        element.classList.add("active")
        element.textContent = "Any of"
        return element
    }

    addAllButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-all-button"
        element.textContent = "All of"
        return element
    }

    addTagFilterText() {
        const element = document.createElement("div")
        element.id = "tag-filter-text"
        element.classList.add("message")
        element.textContent = "Spaces are allowed. Seperate tags by comma."
        return element
    }

}


