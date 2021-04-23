let Player = function(x, y, dir, socketid, name, speed) {
    let self = Entity(x, y, dir)
    
    self.socketid = socketid
    self.name = name
    self.speed = speed
    self.facingLeft = false

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
        }
        
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
            this.x += Math.cos(degrees_to_radians(angle)) * deltat * this.speed;
            this.y -= Math.sin(degrees_to_radians(angle)) * deltat * this.speed;
        }

        if (this.dir > 1 && this.dir < 5) this.facingLeft = false
        if (this.dir > 5) this.facingLeft = true
        
    }

    self.draw = function() {
        drawImage(imgPlayerS, this.x + unitSize, this.y + unitSize, imgPlayerS.width, imgPlayerS.height, 180, this.facingLeft, true, true)
        if (myId == self.socketid) ctx.fillStyle = 'GREEN'
        ctx.font = unitSize + "px Arial";
        ctx.fillText(this.name, this.x, this.y - unitSize);
        ctx.fillStyle = 'BLACK'
    }

    PLAYER_LIST[self.socketid] = self
}