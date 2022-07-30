import config from './config.js'

let cur = NaN

const pathRe = /^meme\/(\d+)\..*/
const sortedItems = config.items.sort((a, b) => Number(a.replace(pathRe, '$1')) > Number(b.replace(pathRe, '$1')) ? 1 : -1)

const title = document.querySelector('#mainContent > div.header > a.title')
const memeImg = document.getElementById('memeImg')

function random(max) {
    return ~~(Math.random() * max) + 1
}

function setupImg(img) {
    title.ariaBusy = 'true'
    title.innerText = `# ${cur}`
    title.href = `#${cur}`
    img.src = sortedItems[cur]
    img.onload = () => {
        title.ariaBusy = 'false'
    }
    img.onclick = () => {
        cur = random(config.count)
        setupImg(img)
    }
}

(() => {
    document.querySelector('#desc').innerHTML = `NoneBot 群大佬们的日常，目前已有 ${ config.count } 张。`
    const hashVal = location.hash.replace(/^#(.*)/, '$1')
    switch (hashVal) {
        case '': break
        case 'gallery':
            break
        default:
            cur = Number(hashVal)
            break
    }
    if (isNaN(cur)) {
        cur = random(config.count)
    }
    setupImg(memeImg)
})()
