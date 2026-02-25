(async () => {
    const limit = 389
    const addImage = async (line) => {
        const imgs = document.getElementById('imgs')

        for (i = line; i<line+lines; i+=3){
            const rp = p => "0".repeat(5 - `${i+p}`.length)
            const extension = [".png", ".jpg"];
            
            const ext = extension.find(e => {
                if (i+2 < limit && ![0, 1, 2].some(p => !e.includes(`./images/${rp(p)}${i+p}${e}`)))
                    return false
                return e
            })
            
            imgs.innerHTML += `
                <div class="row">
                    <div class="card">
                        <img src="${ext ? `./images/${rp(0)}${i}${ext}` : ''}" alt="">
                    </div>
                    <div class="card">
                        <img src="${ext ? `./images/${rp(1)}${i+1 < limit ? i+1 : i}${ext}` : ''}" alt="">
                    </div>
                    <div class="card">
                        <img src="${ext ? `./images/${rp(2)}${i+2 < limit ? i+2 : i}${ext}` : ''}" alt="">
                    </div>
                </div>
            `
        }
    }

    let line = 0, lines = 6

    const load = document.getElementById('unload')
    const unload = document.getElementById('load')

    const loadImgs = async () => {
        document.getElementById('lines').innerHTML = `${line}/${limit}`
        if (line >= limit)
            load.classList.add(['block'])
        else load.classList.remove(['block'])

        if (line <= 0)
            unload.classList.add(['block'])
        else unload.classList.remove(['block'])

        await addImage(line).then(() => {
            const cards = document.getElementsByClassName('card')
            
            for (c = 0; c < cards.length; c++){
                cards[c].addEventListener('click', e => {
                    const current = e.currentTarget
            
                    open(current.lastElementChild.currentSrc, "_blank")
                })
            }
        })
    }

    await loadImgs()

    load.addEventListener('click', async () => {
        if (line < limit) {
            line += lines
            imgs.innerHTML = ``
            await loadImgs()
        }
    })
    
    unload.addEventListener('click', async () => {
        if (line >= 3) {
            line -= lines
            imgs.innerHTML = ``
            await loadImgs()
        }
    })
})()
