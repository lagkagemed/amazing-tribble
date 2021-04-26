let imgPlayer = new Image()
imgPlayer.src = "./client/img/Player.png"
let imgPlayerS = new Image()
imgPlayer.addEventListener("load", function(){
    imgPlayerS.src = Resize_Nearest_Neighbour(imgPlayer, unitSize)
});

let JknapX = 0
let JknapY = 0
let imgJoystick = new Image()
imgJoystick.src = "./client/img/Joystick.png"
let imgJoystickS = new Image()
imgJoystick.addEventListener("load", function(){
    imgJoystickS.src = Resize_Nearest_Neighbour(imgJoystick, Math.floor(unitSize / 2))
});

let BAknapX = 0
let BAknapY = 0
let imgBAKnap = new Image()
imgBAKnap.src = "./client/img/BAKnap.png"
let imgBAKnapS = new Image()
imgBAKnap.addEventListener("load", function(){
    imgBAKnapS.src = Resize_Nearest_Neighbour(imgBAKnap, Math.floor(unitSize / 2))
});

let imgGrass = new Image()
imgGrass.src = "./client/img/Grass.png"
let imgGrassS = new Image()
imgGrass.addEventListener("load", function(){
    imgGrassS.src = Resize_Nearest_Neighbour(imgGrass, Math.floor(unitSize))
});

let hasSetButton = false

function setButtonCoordinates() {
    if (imgJoystickS.width > 0 && imgBAKnapS.width > 0) {
        JknapX = 20
        JknapY = myHeight - imgJoystickS.height - 20
        BAknapX = myWidth - imgBAKnapS.width - 20
        BAknapY = myHeight - 20 - imgJoystickS.height / 2 - imgBAKnapS.height / 2
        hasSetButton = true
    }
}