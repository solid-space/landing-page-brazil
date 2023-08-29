const body = document.querySelector('body')
const domain = '127.0.0.1'

if (window.location.hostname != domain) {
    body.innerHTML = ''
}
