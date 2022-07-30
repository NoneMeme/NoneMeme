export function random(max) {
    return ~~(Math.random() * max)
}


export function changePic(img, index, count) {
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


