import config from './config.js'

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

(async () => {
    const title = document.querySelector('#mainContent > div.header > div.title')
    const memeImg = document.getElementById('memeImg')

    document.querySelector('#desc').innerHTML = `NoneBot 群大佬们的日常，目前已有 ${ config.count } 张。`
})()
