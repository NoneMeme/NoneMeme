import conf from './config.js'

function random(max) {
    return ~~(Math.random() * max) + 1
}

function changePic(img, index, count) {
    const i = random(count)

    index.ariaBusy = true
    img.src = `./meme/${i}.jpg`
    index.innerText = "# " + i
    img.onload = () => {
        index.ariaBusy = false
    }
    img.onclick = () => {
        changePic(img, index, count)
    }
}

function _img(src) {
    const container = document.createElement('div')
    const img = document.createElement('img')

    container.classList.add('image')
    container.style.height = `${conf.gridImageHeight}px`

    const loadingAnim = container.animate([
        { backgroundColor: 'transparent' },
        { backgroundColor: '#555' },
        { backgroundColor: 'transparent' },
    ], { duration: 1000, iterations: Infinity })

    img.src = src
    img.style.height = conf.gridImageHeight + 'px'
    container.appendChild(img)
    img.style.visibility = 'hidden'

    img.onload = () => {
        img.style.visibility = 'visible'
        loadingAnim.cancel()
    }

    container.onclick = () => {
        window.open(src)
    }

    return container
}

function renderGrid(grid, count) {
    let images = []

    for (let i = 0; i < count; i++) {
        images.push(i)
    }

    images = images
        .sort(() => (Math.random() - 0.5))
        .slice(0, conf.maxGridImagesDisplay + 1)

    const frag = document.createDocumentFragment()

    images.forEach(index => {
        frag.appendChild(_img(`./meme/${index + 1}.jpg`))
    })

    grid.appendChild(frag)
}

async function doInit() {
    const title = document.querySelector('#mainContent > div.header > div.title');
    const memeImg = document.getElementById('memeImg');
    const imgGrid = document.getElementById('grid');
    const fresh = document.querySelector('#gallery > div.header > div.opts > span.material-icons.refresh');

    console.log(fresh)

    fresh.onclick = () => {
        imgGrid.innerHTML = ''
        renderGrid(imgGrid, conf.count)
    }

    changePic(memeImg, title, conf.count)
    renderGrid(imgGrid, conf.count)
}

doInit()
