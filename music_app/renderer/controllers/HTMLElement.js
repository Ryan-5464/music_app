class HTMLElement {



    constructor(type) {
        this.element = document.createElement(type)
    }



    addProperties(properties = {}) {
        const pairs = Object.entries(properties)
        pairs.forEach(([key, value]) => {
            if (key in this.element) {
                this.element[key] = value
            }
        })
    }



    addClasses(classes = []) {
        for (const cls of classes) {
            this.element.classList.add(cls)
        }
    }



    addAttributes(attributes = {}) {
        const pairs = Object.entries(attributes)
        pairs.forEach(([key, value]) => {
            this.element.setAttribute(key, value)
        })
    }



    addImage(source, width, height, altText='') {
        const element = document.createElement("img")
        element.src = source
        element.style.cssText = `width: ${width}px; height: ${height}px;`
        if (altText !== '') {
            element.alt = altText
        }
        this.element.appendChild(element)
    }



    addListener(type, handler) {
        this.element.addEventListener(type, handler) 
    }



    removeProperties(propertyKeys = []) {
        propertyKeys.forEach(key => {
            if (key in this.element) {
                delete this.element[key];
            }
        });
    }



    removeClasses(classes = []) {
        for (const cls in classes) {
            this.element.classList.remove(cls)
        }
    }



    removeAttributes(attributeKeys = []) {
        attributeKeys.forEach(key => {
            this.element.removeAttribute(key);
        });
    }



}