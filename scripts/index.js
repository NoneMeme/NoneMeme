import {changePic} from './utils.js'
import conf from '../config.js'

async function doInit() {
    const indexIndicator = document.getElementById('index_show'),
        memeImg = document.getElementById('meme_img')
    
    changePic(memeImg, indexIndicator, conf.count)
}

doInit()