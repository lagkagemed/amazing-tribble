//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
let serv = http.Server(app);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

let SOCKET_LIST = {}
let PLAYER_LIST = {}

let posPack = []

let playerFName = ['attractive', 'bald', 'beautiful', 'chubby', 'clean', 'dazzling', 'drab', 'elegant', 'fancy', 'fit', 'flabby', 'glamorous', 'gorgeous', 'handsome', 'long', 'magnificent', 'muscular', 'plain', 'plump', 'quaint', 'scruffy', 'shapely', 'short', 'skinny', 'stocky', 'ugly', 'unkempt', 'unsightly']
let playerBName = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","news","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president"]

let io = new Server(serv);
io.sockets.on('connection', function(socket){
    socket.id = Math.random();

    let player = {}
    player.x = 100
    player.y = 100
    player.dir = 0
    player.id = socket.id
    player.speed = 2
    

    let bName = pickRand(playerBName)
    bName = bName.charAt(0).toUpperCase() + bName.slice(1)
    player.name = pickRand(playerFName) + bName

    SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[socket.id] = player;


    console.log(player.name + ' connected!');

    socket.emit('yourId', socket.id)
    emitAll('playerUpdate', PLAYER_LIST)

    socket.emit('map', map)

    socket.on('movement',function(data){
        if (data != null) {
            console.log(data)
            player.x = data.x
            player.y = data.y
            player.dir = data.dir

            posPack.push({
                x:player.x,
                y:player.y,
                dir:player.dir,
                id:player.id
            });
        }
    })

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
        emitAll('playerUpdate', PLAYER_LIST)
        console.log(player.name + ' disconnected');
    });
});

function pickRand(array) {
    let rand = array[(Math.random() * array.length) | 0]
    return rand
}

function emitAll(msg, data) {
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i]
        socket.emit(msg, data)
    }
}

function createMap(wid, hei, isl, siz) {
    let newMap = []
    let Islands = []

    let Island = function(cX, cY) {
        let self = {
            cX:cX,
            cY:cY,
            lX:cX,
            lY:cY
        }

        return self
    }

    for (let i = 0; i < wid; i++) {
        newMap.push([])

        for (let a = 0; a < hei; a++) {
            newMap[i].push(0)
        }

    }

    for (let i = 0; i < isl; i++) {
        let randX = Math.floor(Math.random() * wid)
        let randY = Math.floor(Math.random() * hei)
        newMap[randX][randY] = 1
        Islands.push(Island(randX, randY))
    }

    
    for (let i = 0; i < siz;) {
        let randIsl = Math.floor(Math.random() * Islands.length)
        let currentIsland = Islands[randIsl]

        let newX = currentIsland.lX
        let newY = currentIsland.lY

        let randDir = Math.floor(Math.random() * 4)

        if (randDir == 0 ) newX -=1
        if (randDir == 1 ) newX +=1
        if (randDir == 2 ) newY -=1
        if (randDir == 3 ) newY +=1

        if (newX < 0) newX = wid -1
        if (newX > wid - 1) newX = 0
        if (newY < 0) newY = hei -1
        if (newY > hei - 1) newY = 0

        let currentTile = newMap[newX][newY]

        if (currentTile == 0) {
            newMap[newX][newY] = 1
            currentIsland.lX = newX
            currentIsland.lY = newY
            i++
        }

    }
    
    console.log(newMap)
    console.log(Islands)
    return newMap
}

let map = createMap(20, 20, 10, 200)

setInterval(function(){
    if (posPack != []) emitAll('newPositions', posPack)

    posPack = []
},1000/25);