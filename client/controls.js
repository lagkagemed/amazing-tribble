let pressingUp = false
let pressingDown = false
let pressingLeft = false
let pressingRight = false

let haveSentUp = false
let haveSentDown = false
let haveSentLeft = false
let haveSentRight = false

let sendNewInfo = false

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.addEventListener('keydown', logKeyDown);
document.addEventListener('keyup', logKeyUp);

function logKeyDown(e) {
    if (e.keyCode == 87) pressingUp = true
    if (e.keyCode == 83) pressingDown = true
    if (e.keyCode == 65) pressingLeft = true
    if (e.keyCode == 68) pressingRight = true
}

function logKeyUp(e) {
    if (e.keyCode == 87) {
        pressingUp = false
        haveSentUp = false
        sendNewInfo = true
    }

    if (e.keyCode == 83) {
        pressingDown = false
        haveSentDown = false
        sendNewInfo = true
    }

    if (e.keyCode == 65) {
        pressingLeft = false
        haveSentLeft = false
        sendNewInfo = true
    }

    if (e.keyCode == 68) {
        pressingRight = false
        haveSentRight = false
        sendNewInfo = true
    }
}

function checkKeyStates() {
    if (pressingUp && !haveSentUp) {
        sendNewInfo = true
        haveSentUp = true
    }

    if (pressingDown && !haveSentDown) {
        sendNewInfo = true
        haveSentDown = true
    }

    if (pressingRight && !haveSentRight) {
        sendNewInfo = true
        haveSentRight = true
    }

    if (pressingLeft && !haveSentLeft) {
        sendNewInfo = true
        haveSentLeft = true
    }

}

canvas.addEventListener('touchstart', dragStart, false)
canvas.addEventListener('touchend', dragEnd, false)
canvas.addEventListener('touchmove', drag, false)


let touchX = 0
let touchY = 0

function dragStart(e) {
    e.preventDefault()
    touchX = e.touches[0].clientX
    touchY = e.touches[0].clientY
}

function dragEnd() {
    pressingUp = false
    pressingDown = false
    pressingLeft = false
    pressingRight = false
    sendNewInfo = true
    touchX = 0
    touchY = 0
}

function drag(e) {
    e.preventDefault()
    touchX = e.touches[0].clientX
    touchY = e.touches[0].clientY
}

function updateTouchControls() {
    if (touchX > JknapX && touchX < JknapX + imgJoystickS.width && touchY > JknapY && touchY < JknapY + imgJoystickS.height / 3) {
        pressingUp = true
    } else if (haveSentUp) {
        pressingUp = false
        haveSentUp = false
        sendNewInfo = true
    }

    if (touchX > JknapX && touchX < JknapX + imgJoystickS.width && touchY > JknapY + imgJoystickS.height / 3 * 2 && touchY < JknapY + imgJoystickS.height) {
        pressingDown = true
    } else if (haveSentDown) {
        pressingDown = false
        haveSentDown = false
        sendNewInfo = true
    }

    if (touchX > JknapX && touchX < JknapX + imgJoystickS.width / 3 && touchY > JknapY && touchY < JknapY + imgJoystickS.height) {
        pressingLeft = true
    } else if (haveSentLeft) {
        pressingLeft = false
        haveSentLeft = false
        sendNewInfo = true
    }

    if (touchX > JknapX + imgJoystickS.width / 3 * 2 && touchX < JknapX + imgJoystickS.width && touchY > JknapY && touchY < JknapY + imgJoystickS.height) {
        pressingRight = true
    } else if (haveSentRight) {
        pressingRight = false
        haveSentRight = false
        sendNewInfo = true
    }
}

function drawTouchControls() {
        ctx.globalAlpha = 0.7
        ctx.drawImage(imgJoystickS, JknapX, JknapY)
        ctx.drawImage(imgBAKnapS, BAknapX, BAknapY)
        ctx.globalAlpha = 1
}

