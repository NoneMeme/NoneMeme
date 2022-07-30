import config from './config.js'

let cur = NaN

const pathRe = /^meme\/(\d+)\..*/
const sortedItems = config.items.sort((a, b) => Number(a.replace(pathRe, '$1')) > Number(b.replace(pathRe, '$1')) ? 1 : -1)

function random(max) {
    return ~~(Math.random() * max) + 1
}

function initMainContent() {
    document.querySelector('#desc').innerHTML = `NoneBot 群大佬们的日常，目前已有 ${config.count} 张。`
    const hashVal = location.hash.replace(/^#(.*)/, '$1')
    switch (hashVal) {
        case '':
            break
        case 'gallery':
            break
        default:
            cur = Number(hashVal)
            break
    }
    if (isNaN(cur)) {
        cur = random(config.count)
    }
    const title = document.querySelector('#mainContent > div.header > a.title')
    const downloadMemeImg = document.querySelector('#mainContent > div.header > div.opts > a.material-icons.download')
    const memeImg = document.getElementById('memeImg')
    memeImg.onload = () => {
        title.ariaBusy = 'false'
    }
    memeImg.onclick = () => {
        cur = random(config.count)
        setupMemeImg(memeImg)
    }

    function setupMemeImg(img) {
        title.ariaBusy = 'true'
        title.innerText = `# ${cur}`
        title.href = `#${cur}`
        location.hash = `#${cur}`
        img.src = sortedItems[cur]
        downloadMemeImg.href = img.src
    }

    setupMemeImg(memeImg)
}

(() => {
    initMainContent()
})()
