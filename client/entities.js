let Entity = function(x,y){
    let self = {
        x:x,
        y:y,
    }
    return self
}

let Tile = function(x,y, type){
    let self = Entity(x, y)

    self.type = type

    return self
}


let Tree = function(x,y){
    let self = Entity(x, y)

    self.draw = function() {
        ctx.drawImage(imgTreeS, ((this.x * unitSize) - offsetX - imgTreeS.width / 2), ((this.y * unitSize) - offsetY - imgTreeS.height))
    }

    return self
}