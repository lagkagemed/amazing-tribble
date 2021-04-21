let pressingUp = false
let pressingDown = false
let pressingLeft = false
let pressingRight = false

let haveSentUp = false
let haveSentDown = false
let haveSentLeft = false
let haveSentRight = false

let sendNewInfo = false


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