const form = document.getElementById('form')
const url = document.getElementById('url')
const pError = document.querySelector('.error')
const result = document.querySelector('.result')
const pLink = document.querySelector('.pLink')
const pResponse = document.querySelector('.pResponse')
const copyButton = document.querySelector('.copyButton')
const menuHamburger = document.querySelector('.menuHamburger')
const menuMobile = document.querySelector('.alignMenus')


form.onsubmit = (e) => {
    e.preventDefault()
    checkLink()
}

menuHamburger.onclick = () => {
    menuMobile.classList.toggle('active')
}


copyButton.addEventListener('click', copyLink) 
pResponse.addEventListener('touchstart', copyLink)

function checkLink () {
    let link = url.value
    let regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")

    if(link === '') {
        buildError('please add a link')
    } else if (regex.test(link)) {
        getApi(link)
        removeError()
    } else {
        buildError('please enter a valid url')
    }
}

function getApi(url) { 
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then(response => {
        return response.json()
    })
    .then(url => buildData(url))
    .catch (error => buildError(error))
}

function buildData (url) {
    let results = url.result
    result.classList.add('visible')
    pLink.textContent = results.original_link
    pResponse.textContent = results.full_short_link
}

function buildError (message) {
    pError.textContent = message
    pError.classList.add('active')
    url.classList.add('error')
    result.classList.remove('visible')
}

function removeError () {
    pError.classList.remove('active')
    url.classList.remove('error')
}

function copyLink() {
    navigator.clipboard.writeText(pResponse.textContent)
    copyButton.classList.add('active')
    copyButton.textContent = 'Copied!'
    setTimeout(()=> {
        copyButton.classList.remove('active')
        copyButton.textContent = 'Copy'
    }, 1000)
}