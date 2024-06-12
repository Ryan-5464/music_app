class SearchFilter {

    makeElement() {
        const element = document.createElement("div")
        element.id = "search-filter"
        element.appendChild(this.addFilterInput())
        element.appendChild(this.addByTitleButton())
        element.appendChild(this.addByArtistButton())
        return element
    }

    addFilterInput() {
        const element = document.createElement("input")
        element.id = "search-filter-input"
        element.classList.add("input-box")
        return element
    }

    addByTitleButton() {
        const element = document.createElement("button")
        element.id = "search-filter-bytitle-button"
        element.textContent = "By Title"
        element.classList.add("active")
        return element
    }

    addByArtistButton() {
        const element = document.createElement("button")
        element.id = "search-filter-byartist-button"
        element.textContent = "By Artist"
        return element
    }


}