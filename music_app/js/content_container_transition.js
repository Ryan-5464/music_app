

const enter_button = document.getElementById('enter-button')
enter_button.addEventListener('click', content_container_transition)


function content_container_transition() {
    fetch("./html/download.html")
    .then(response => response.text())
    .then((data) => {
        const body_content_container = document.getElementById('body-content-container')
        body_content_container.classList.add('fade-out')
        setTimeout(() => {
            body_content_container.innerHTML = data
            body_content_container.classList.remove('fade-out')
        }, 500)
    })
}