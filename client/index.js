let socket = io();

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
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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