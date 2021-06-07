let pressingUp = false
let pressingDown = false
let pressingLeft = false
let pressingRight = false

let pressingRun = false
let pressingJump = false

let haveSentUp = false
let haveSentDown = false
let haveSentLeft = false
let haveSentRight = false

let haveSentRun = false
let haveSentJump = false

let sendNewInfo = false

let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

document.addEventListener('keydown', logKeyDown);
document.addEventListener('keyup', logKeyUp);

function logKeyDown(e) {
    if (e.keyCode == 87) pressingUp = true
    if (e.keyCode == 83) pressingDown = true
    if (e.keyCode == 65) pressingLeft = true
    if (e.keyCode == 68) pressingRight = true
    if (e.keyCode == 76) pressingRun = true
    if (e.keyCode == 75) pressingJump = true
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

    if (e.keyCode == 76) {
        pressingRun = false
        haveSentRun = false
        sendNewInfo = true
    }

    if (e.keyCode == 75) {
        pressingJump = false
        haveSentJump = false
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

    if (pressingRun && !haveSentRun) {
        sendNewInfo = true
        haveSentRun = true
    }

    if (pressingJump && !haveSentJump) {
        sendNewInfo = true
        haveSentJump = true
    }

}

canvas.addEventListener('touchstart', dragStart, false)
canvas.addEventListener('touchend', dragEnd, false)
canvas.addEventListener('touchmove', drag, false)

let runTime = 0
let touchJoy = -1
let touchJoyX = 0
let touchJoyY = 0

function dragStart(e) {
    e.preventDefault()
    for (let i = 0; i < e.touches.length; i++) {
        let touchX = e.touches[i].clientX
        let touchY = e.touches[i].clientY

        if (touchJoy == -1) {
            if (touchX > JknapX && touchX < JknapX + imgJoystickS.width && touchY > JknapY && touchY < JknapY + imgJoystickS.height) {
                touchJoy = e.touches[i].identifier
                touchJoyX = touchX
                touchJoyY = touchY
                if (runTime > 0 ) pressingRun = true
                runTime = 15
            }
        }
    }
}

function dragEnd(e) {
    if (touchJoy != -1) {
        let touchJoyExist = false
        for (let i = 0; i < e.touches.length; i++) {
            if (e.touches[i].identifier == touchJoy) touchJoyExist = true
        }
        if (!touchJoyExist) {
            pressingUp = false
            pressingDown = false
            pressingLeft = false
            pressingRight = false
            sendNewInfo = true
            touchJoyX = 0
            touchJoyY = 0
            touchJoy = -1
            pressingRun = false
        }
    }
}

function drag(e) {
    e.preventDefault()
    if (touchJoy !== -1) {
        for (let i = 0; i < e.touches.length; i++) {
            let touchX = e.touches[i].clientX
            let touchY = e.touches[i].clientY
            if (e.touches[i].identifier == touchJoy) {
                touchJoyX = touchX
                touchJoyY = touchY
            }
        }
    }
}

function updateTouchControls() {
    runTime--
    let touchX = touchJoyX
    let touchY = touchJoyY

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

