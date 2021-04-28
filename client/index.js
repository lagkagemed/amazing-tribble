let socket = io();

let map

socket.on('yourId',function(data){
    myId = data
});

socket.on('playerUpdate', function(data){
    PLAYER_LIST = {}
    for (i in data) {
        let player = Player(data[i].x, data[i].y, data[i].dir, data[i].id, data[i].name, data[i].speed)
    }
})

socket.on('newPositions',function(data){
    for(let i = 0 ; i < data.length; i++) {
        if (myId != data[i].id) {
            let player = PLAYER_LIST[data[i].id]
            player.x = data[i].x
            player.y = data[i].y
            player.dir = data[i].dir
        }
    }
});

socket.on('map', function(data){
    map = data
    receivedMap = true
})

function sendInfo() {
    if (sendNewInfo) {
        socket.emit('movement', PLAYER_LIST[myId])
        sendNewInfo = false
    }
}

function update() {
    setDeltaT()
    if (!hasSetButton) setButtonCoordinates()
    if (hasSetButton && isMobile) updateTouchControls()
    updateAllObjectsInList(PLAYER_LIST)
    checkKeyStates()
    sendInfo()
    setOffset()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    if (receivedMap) drawMap()
    drawAllObjectsInList(PLAYER_LIST)
    if (isMobile) drawTouchControls()
}



setInterval(function(){
    update()
    draw()
},1000/50);


function setDeltaT() {
    deltat = (t + performance.now()) / 10
    t = -1 * performance.now()
}

function drawAllObjectsInList(list) {
    for (let i in list) {
        let object = list[i];
        object.draw();
    }
}

function updateAllObjectsInList(list) {
    for (let i in list) {
        let object = list[i];
        object.update();
    }
}

let receivedMap = false

function drawMap() {
    for (let i = 0; i < map.tiles.length; i++) {
        for (let a = 0; a < map.tiles[i].length; a++) {
            if (map.tiles[i][a] == 1) {
                ctx.drawImage(imgGrassS, i * unitSize * 16 - offsetX, a * unitSize * 16 - offsetY)
            }
            if (map.tiles[i][a] == 2) {
                ctx.drawImage(imgGrassFS, i * unitSize * 16 - offsetX, a * unitSize * 16 - offsetY)
            }
            if (map.tiles[i][a] == 3) {
                ctx.drawImage(imgGrassMS, i * unitSize * 16 - offsetX, a * unitSize * 16 - offsetY)
            }
        }
    }
    for (let i = 0; i < map.trees.length; i++) {
        ctx.drawImage(imgTreeS, ((map.trees[i].x * unitSize) - offsetX - imgTreeS.width / 2), ((map.trees[i].y * unitSize) - offsetY - imgTreeS.height))
    }
}

function setOffset() {
    offsetX = PLAYER_LIST[myId].x * unitSize - myWidth / 2
    offsetY = PLAYER_LIST[myId].y * unitSize - myHeight / 2
}