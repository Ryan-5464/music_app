class TagFilter {

    makeElement() {
        const element = document.createElement("div")
        element.id = "tag-filter"
        element.appendChild(this.addFilterInput())
        element.appendChild(this.addAnyButton())
        element.appendChild(this.addAllButton())
        return element
    }

    addFilterInput() {
        const element = document.createElement("input")
        element.id = "tag-filter-input"
        element.classList.add("input-box")
        return element
    }

    addAnyButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-any-button"
        element.classList.add("active")
        element.textContent = "Any"
        return element
    }

    addAllButton() {
        const element = document.createElement("button")
        element.id = "tag-filter-all-button"
        element.textContent = "All"
        return element
    }

}