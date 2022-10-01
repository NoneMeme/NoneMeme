import config from "./config.js"

const development = location.host.search(/.+\.github\.io/) === -1
const domParser = new DOMParser()   
/** @type {string[]} */
let item = []
let displayedItemCount = 0

const galleryIO = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio > 0 && displayedItemCount < item.length) loadgallery(10)
})

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function random(max, min) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * @param {Number} time 
 */
function createEleByTemp(id, obj) {
    const temp = document.createElement('div')
    temp.innerHTML = Object.entries(obj)
        .reduce((old, [key, val]) => old.replaceAll(`\${${key}}`, val), document.getElementById(id).innerHTML)
    return temp.children[0]
}

/**
 * @param {String} url 
 * @returns {Promise<XMLHttpRequest>}
 */
function get(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.addEventListener('load', () => resolve(xhr))
        xhr.addEventListener('error', () => reject(xhr))
        xhr.send()
    })
}

async function loadgallery(remainItemCount) {
    if (remainItemCount <= 0 || displayedItemCount >= item.length) {
        galleryIO.observe(document.getElementById('footer'))
        return
    }
    galleryIO.unobserve(document.getElementById('footer'))
    
    // 获取高度最小的列
    const column = [document.getElementById('col1'), document.getElementById('col2'), document.getElementById('col3')]
    .sort((a, b) => a.offsetHeight - b.offsetHeight)[0]

    const node = createEleByTemp('gallery-item', {
        id: `#${item[displayedItemCount].match(/(.+)\.(jpg|png|jfif|webp|gif)/)[1]}`,
        src: `/meme/${item[displayedItemCount]}`,
        alt: item[displayedItemCount],
        title: `# ${item[displayedItemCount].match(/(.+)\.(jpg|png|jfif|webp|gif)/)[1]}`,
    })

    // 加载好以后再执行下一个图片的加载以保证顺序没问题
    node.querySelector('img').addEventListener('load', () => loadgallery(remainItemCount - 1))
    column.append(node)
    displayedItemCount += 1
    
}

function view() {
    if (!location.hash) document.getElementById('view').style.display = 'none'
    else document.getElementById('view').style.display = 'block'
    let name = decodeURIComponent(location.hash.substring(1, location.hash.length))
    document.querySelector('#view h2').innerHTML = `# ${name}`
    for (const i of item) {
        if (i.startsWith(name)) {
            name = i
            break
        }
    }
    
    document.querySelector('#view img').src = `/meme/${name}`
    document.querySelector('#view img').alt = name
    document.querySelector('#view a').href = `/meme/${name}`
    window.scrollTo({
        top: document.getElementById('view').offsetTop,
        behavior: 'smooth'
    })
}

async function initgallery() {
    document.getElementById('description').innerHTML = `NoneBot 群大佬们的日常，目前已有 ${item.length} 张。`
    for (let i = 0; i < item.length - 1; i++) {
        const j = random(item.length - 1, i)
        const temp = item[i]
        item[i] = item[j]
        item[j] = temp
    }
    await loadgallery(10)
    galleryIO.observe(document.getElementById('footer'))
    view()
}

(async () => {
    /** 
     * 判断使用何种API, 获取图片列表
     */
    
    // 开发环境(使用live server)
    if (development) {
        for (const i of domParser.parseFromString((await get('../meme/')).response, 'text/html').querySelectorAll('#files a.icon-image')) {
            item.push(decodeURIComponent(i.href.match(/(?<=meme\/).+\.(jpg|png|jfif|webp|gif)/)[0]))
        }
    
    // 生产环境
    } else {
        for (const i of JSON.parse((await get(config.api)).response)) {
            item.push(decodeURIComponent(i.download_url.match(/(?<=meme\/).+\.(jpg|png|jfif|webp|gif)/)[0]))
        }
    }
    initgallery()
    window.addEventListener('hashchange', view)
})()
