let Player = function(x, y, dir, socketid, name, wSpeed, rSpeed) {
    let self = Entity(x, y)

    self.z = 0
    self.dir = dir
    self.socketid = socketid
    self.name = name
    self.wSpeed = wSpeed
    self.rSpeed = rSpeed

    self.facingLeft = false

    self.isRunning = false

    self.isJumping = false
    self.zVel = 0
    self.jumpVel = 5


    self.update = function() {
        if (myId == self.socketid) {
            if (!pressingUp && !pressingRight && !pressingDown && !pressingLeft) this.dir = 0
            if (pressingUp && !pressingRight && !pressingDown && !pressingLeft) this.dir = 1
            if (pressingUp && pressingRight && !pressingDown && !pressingLeft) this.dir = 2
            if (!pressingUp && pressingRight && !pressingDown && !pressingLeft) this.dir = 3
            if (!pressingUp && pressingRight && pressingDown && !pressingLeft) this.dir = 4
            if (!pressingUp && !pressingRight && pressingDown && !pressingLeft) this.dir = 5
            if (!pressingUp && !pressingRight && pressingDown && pressingLeft) this.dir = 6
            if (!pressingUp && !pressingRight && !pressingDown && pressingLeft) this.dir = 7
            if (pressingUp && !pressingRight && !pressingDown && pressingLeft) this.dir = 8

            this.isRunning = false
            if (pressingRun) this.isRunning = true

            this.isJumping = false
            if (pressingJump) this.isJumping = true
        }

        let speed = 0
        if (!this.isRunning) speed = wSpeed
        if (this.isRunning) speed = rSpeed
        
        let angle = 0
        if (this.dir == 1) angle = 90
        if (this.dir == 2) angle = 45
        if (this.dir == 3) angle = 0
        if (this.dir == 4) angle = 315
        if (this.dir == 5) angle = 270
        if (this.dir == 6) angle = 225
        if (this.dir == 7) angle = 180
        if (this.dir == 8) angle = 135

        if (this.dir != 0) {
            this.x += Math.cos(degrees_to_radians(angle)) * deltat * speed;
            this.y -= Math.sin(degrees_to_radians(angle)) * deltat * speed;
        }

        if (this.dir > 1 && this.dir < 5) this.facingLeft = false
        if (this.dir > 5) this.facingLeft = true

        if (this.z < 0 ) this.z += physGravity
        if (this.z > 0 ) this.z = 0
        if (this.isJumping && this.z == 0) this.zVel = this.jumpVel
        if (this.zVel > 0) {
            this.z -= this.zVel
            this.zVel -= 1
        }
        
    }

    self.draw = function() {
        drawImage(imgPlayerS, (this.x * unitSize - offsetX), (this.y * unitSize - offsetY - imgPlayerS.height / 2 + this.z * unitSize), imgPlayerS.width, imgPlayerS.height, 180, this.facingLeft, true, true)
        if (myId == self.socketid) ctx.fillStyle = 'GREEN'
        ctx.font = (unitSize * 2) + "px Arial";
        ctx.fillText(this.name, (this.x * unitSize - (unitSize * this.name.length / 2) - offsetX), (this.y * unitSize + unitSize * 2 - offsetY));
        ctx.fillStyle = 'BLACK'
    }

    PLAYER_LIST[self.socketid] = self
}