window.onload = function() {
    init()
    window.addEventListener('resize', init, false)
    window.addEventListener("orientationchange", init, false)
}
function init() {
    let myWidth = 0
    let myHeight = 0
    myWidth = window.innerWidth - 5
    myHeight = window.innerHeight -5 
    ctx.canvas.width = myWidth
    ctx.canvas.height = myHeight
    setUnitSize(myWidth, myHeight)
}

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
    updateAllObjectsInList(PLAYER_LIST)
    checkKeyStates()
    sendInfo()
}


function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawAllObjectsInList(PLAYER_LIST)
}



setInterval(function(){
    update()
    draw()
},1000/100);


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

function setUnitSize(myWidth, myHeight) {
    if (myWidth <= myHeight) unitSize = myWidth / 10
    if (myHeight <= myWidth) unitSize = myHeight / 10
}

let isReady = new Image()
let imgPlayer = new Image()
imgPlayer.src = "./client/img/Player.png"
let imgPlayerS = new Image()
imgPlayer.addEventListener("load", function(){
    imgPlayerS.src = Resize_Nearest_Neighbour(imgPlayer, unitSize)
});