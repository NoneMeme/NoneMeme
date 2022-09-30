/** @type {string[]} */
const sortedItems = []
const development = location.host.search(/.+\.github\.io/) == -1

const domParser = new DOMParser()
const pathRe = /^meme\/(.+)\..*/
const api = 'https://api.github.com/repos/NoneMeme/NoneMeme/contents/meme'

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

    document.querySelector('#desc').innerHTML = `NoneBot 群大佬们的日常，目前已有 ${sortedItems.length} 张。`
    const hashVal = decodeURIComponent(location.hash.replace(/^#(.*)/, '$1'))
    switch (hashVal) {
        case '':
            break
        case 'gallery':
            break
        default:
            const i = sortedItems.findIndex(i => i.startsWith(`meme/${hashVal}`))
            cur = i === -1 ? NaN : (i + 1)
            break
    }
    if (isNaN(cur)) {
        cur = random(1, sortedItems.length)
    }
    const title = document.querySelector('#mainContent > div.header > a.title')
    const downloadMemeImg = document.querySelector('#mainContent > div.header > div.opts > a.material-icons.download')
    const refreshMemeImg = document.querySelector('#mainContent > div.header > div.opts > span.material-icons.refresh')
    const memeImg = document.getElementById('memeImg')
    refreshMemeImg.onclick = () => {
        cur = random(1, sortedItems.length)
        setupMemeImg(memeImg)
    }
    memeImg.onload = () => {
        title.ariaBusy = 'false'
    }
    memeImg.onclick = refreshMemeImg.onclick

    function setupMemeImg(img) {
        const item = sortedItems[cur - 1]
        const name = item.replace(pathRe, '$1')
        title.ariaBusy = 'true'
        title.innerText = `# ${name}`
        title.id = name
        location.hash = title.href = `#${name}`
        img.src = item
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
        const start = random(1, sortedItems.length)
        const end = random(start, sortedItems.length)
        gallaryContainer.innerHTML = ''
        gallaryContainer.append(
            ...sortedItems
                .slice(start, end)
                .map(item => {
                    const name = item.replace(pathRe, '$1')
                    return createEleByTemp('galleryItem', {
                        id: `#${name}`,
                        src: item,
                        alt: item.replace(/^meme\/(.*)/, '$1'),
                        title: `# ${name}`,
                    })
                })
        )
    }
}

(() => {
    // 开发环境
    if (development) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../meme/')
        xhr.addEventListener('load', () => {
            for (let i of domParser.parseFromString(xhr.response, 'text/html').querySelectorAll('#files a.icon-image')) {
                sortedItems.push(decodeURIComponent(i.href.match(/meme\/.+\.(jpg|png|jfif|webp|gif)/)[0]))
            }
            initMainContent()
            initGallary()
        })
        xhr.send()

    // 生产环境
    } else {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', api)
        xhr.addEventListener('load', () => {
            for (let i of JSON.parse(xhr.response)) {
                itsortedItemsem.push(decodeURIComponent(i.download_url.match(/meme\/.+\.(jpg|png|jfif|webp|gif)/)[0]))
            }

            initMainContent()
            initGallary()
        })
        xhr.addEventListener('error')
        xhr.send()
    }

    sortedItems.sort((a, b) => a.replace(pathRe, '$1') > b.replace(pathRe, '$1') ? 1 : -1)
})()
