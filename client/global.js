let canvas = document.getElementById("ctx")
let ctx = canvas.getContext("2d")

let t = performance.now()
let deltat = 10

let PLAYER_LIST = {}
let myId = 0

function degrees_to_radians(degrees)
{
  let pi = Math.PI;
  return degrees * (pi/180);
}