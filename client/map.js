function updateCache() {
    if (cachingTime >= 30) {
        orderlessCache = []
        orderedCache = []

        let mP = PLAYER_LIST[myId]

        let sX = myWidth / unitSize * 2
        let sY = myHeight / unitSize * 2

        // cache the orderless, for now just the tiles
        for (let i = 0; i < map.tiles.length; i++) {
            let tT = map.tiles[i]
            if (tT.x > mP.x - sX && tT.x < mP.x + sX && tT.y > mP.y - sY && tT.y < mP.y + sY) {
                orderlessCache.push(tT)
            }
        }

        // cache the to be ordered, first the trees
        for (let i = 0; i < map.trees.length; i++) {
            let tT = map.trees[i]
            if (tT.x > mP.x - sX && tT.x < mP.x + sX && tT.y > mP.y - sY && tT.y < mP.y + sY) {
                orderedCache.push(tT)
            }
        }

        for (let i in PLAYER_LIST) {
            let cP = PLAYER_LIST[i]
            if (cP.x > mP.x - sX && cP.x < mP.x + sX && cP.y > mP.y - sY && cP.y < mP.y + sY) {
                orderedCache.push(cP)
            }
        }

        cachingTime = 0
    }
    
    orderedCache.sort(function(a, b) {
        return a.y - b.y;
    });
    
    cachingTime++
}

function drawOrderless() {
    for (let i = 0; i < orderlessCache.length; i++) {
        let tT = orderlessCache[i]
        if (tT.type == 1) ctx.drawImage(imgGrassS, tT.x * unitSize - offsetX, tT.y * unitSize - offsetY)
        if (tT.type == 2) ctx.drawImage(imgGrassFS, tT.x * unitSize - offsetX, tT.y * unitSize - offsetY)
        if (tT.type == 3) ctx.drawImage(imgGrassMS, tT.x * unitSize - offsetX, tT.y * unitSize - offsetY)
    }
}

function drawOrdered() {
    for (let i = 0; i < orderedCache.length; i++) {
        let object = orderedCache[i]
        object.draw()
    }
}