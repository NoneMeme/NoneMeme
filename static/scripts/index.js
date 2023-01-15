import config from './config.js'

const development =
    location.host.search(/.+\.github\.io/) === -1 &&
    location.host.search(/nonememe\.icu/) === -1
const domParser = new DOMParser()
/** @type {string[]} */
let items = []
let displayedItemCount = 0

const galleryIO = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0 && displayedItemCount < items.length)
        loadgallery(10)
})

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function random(max, min) {
    return Math.round(Math.random() * (max - min)) + min
}

/**
 * @param {string} id
 * @param {Record<string, any>} obj
 * @returns {Element}
 */
function createEleByTemp(id, obj) {
    const temp = document.createElement('div')
    temp.innerHTML = Object.entries(obj).reduce(
        (old, [key, val]) => old.replaceAll(`\${${key}}`, val),
        document.getElementById(id).innerHTML
    )
    return temp.children[0]
}

/**
 * @param {string} url
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
    if (remainItemCount <= 0 || displayedItemCount >= items.length) {
        galleryIO.observe(document.getElementById('footer'))
        return
    }
    galleryIO.unobserve(document.getElementById('footer'))

    // 获取高度最小的列
    const column = [
        document.getElementById('col1'),
        document.getElementById('col2'),
        document.getElementById('col3'),
    ].sort((a, b) => a.offsetHeight - b.offsetHeight)[0]

    const node = createEleByTemp('gallery-item', {
        id: `#${
            items[displayedItemCount].match(
                /meme\/(.+)\.(jpg|png|jfif|webp|gif)/
            )[1]
        }`,
        src: `./${items[displayedItemCount]}`,
        alt: items[displayedItemCount],
        title: `# ${
            items[displayedItemCount].match(
                /meme\/(.+)\.(jpg|png|jfif|webp|gif)/
            )[1]
        }`,
    })

    // 加载好以后再执行下一个图片的加载以保证顺序没问题
    node.querySelector('img').addEventListener('load', () =>
        loadgallery(remainItemCount - 1)
    )
    column.append(node)
    displayedItemCount += 1
}

function view() {
    const view = document.getElementById('view')
    view.style.display = {
        true: 'none',
        false: 'block',
    }[!location.hash || location.hash == '#']
    let name = decodeURIComponent(
        location.hash.substring(1, location.hash.length)
    )
    view.querySelector('h2').innerHTML = `# ${name}`
    for (const i of items) {
        if (
            i.search(new RegExp(`meme/${name}\.(jpg|png|jfif|webp|gif)`)) != -1
        ) {
            name = i
            break
        }
    }

    view.querySelector('img').src = `./${name}`
    view.querySelector('img').alt = name
    view.querySelector('a').href = `./${name}`
    window.scrollTo({
        top: view.offsetTop,
        behavior: 'smooth',
    })
}

async function initgallery() {
    document.getElementById(
        'description'
    ).innerHTML = `NoneBot 群大佬们的日常，目前已有 ${items.length} 张。`
    document.getElementById('refresh-btn').onclick = () => {
        location.hash = `#${
            items[random(items.length - 1, 0)].match(
                /meme\/(.+)\.(jpg|png|jfif|webp|gif)/
            )[1]
        }`
    }
    for (let i = 0; i < items.length - 1; i++) {
        const j = random(items.length - 1, i)
        const temp = items[i]
        items[i] = items[j]
        items[j] = temp
    }
    await loadgallery(10)
    galleryIO.observe(document.getElementById('footer'))
    view()
}

;(async () => {
    /**
     * 判断使用何种 API , 获取图片列表
     */

    // 开发环境(使用 live server)
    if (development) {
        for (const i of domParser
            .parseFromString((await get('../meme/')).response, 'text/html')
            .querySelectorAll('#files a.icon-image')) {
            items.push(
                'meme/' +
                    decodeURIComponent(
                        i.href.match(
                            /(?<=meme\/).+\.(jpg|png|jfif|webp|gif)/
                        )[0]
                    )
            )
        }
    } else {
        // 生产环境(使用静态文件)
        items = config.items
    }

    initgallery()
    window.addEventListener('hashchange', view)
})()
