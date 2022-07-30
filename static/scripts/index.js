import config from './config.js'

const pathRe = /^meme\/(\d+)\..*/
/** @type {string[]} */
const sortedItems = config.items.sort((a, b) => Number(a.replace(pathRe, '$1')) > Number(b.replace(pathRe, '$1')) ? 1 : -1)

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * @param id  {string}
 * @param obj {Record<string, any>}
 * @returns {Element}
 */
function createEleByTemp(id, obj) {
    const temp = document.createElement('div')
    temp.innerHTML = Object.entries(obj)
        .reduce((old, [key, val]) => old.replaceAll(`\${${key}}`, val), document.getElementById(id).innerHTML)
    return temp.children[0]
}

function initMainContent() {
    let cur = NaN

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
        cur = random(1, config.count)
    }
    const title = document.querySelector('#mainContent > div.header > a.title')
    const downloadMemeImg = document.querySelector('#mainContent > div.header > div.opts > a.material-icons.download')
    const memeImg = document.getElementById('memeImg')
    memeImg.onload = () => {
        title.ariaBusy = 'false'
    }
    memeImg.onclick = () => {
        cur = random(1, config.count)
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

    window.onhashchange = () => {
        initMainContent()
    }
}

function initGallary() {
    const gallary = document.querySelector('#gallery')
    const gallaryContainer = gallary.querySelector('div.gallery__container')
    const refreshGallary = gallary.querySelector('div.header > div.opts > span.material-icons.refresh')

    refreshGallary.onclick = updateGallary

    updateGallary()

    function updateGallary() {
        const start = random(1, config.count)
        const end = random(start, config.count)
        gallaryContainer.innerHTML = ''
        gallaryContainer.append(
            ...sortedItems
                .slice(start, end)
                .map(item => {
                    const num = Number(item.replace(pathRe, '$1')) - 1
                    return createEleByTemp('galleryItem', {
                        id: `#${num}`,
                        src: item,
                        alt: item.replace(/^meme\/(.*)/, '$1'),
                        title: `# ${num}`,
                    })
                })
        )
    }
}

(() => {
    initMainContent()
    initGallary()
})()
