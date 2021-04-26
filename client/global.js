let canvas = document.getElementById("ctx")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false

let myWidth = 10
let myHeight = 10

let offsetX
let offsetY

let unitSize = 10

function setUnitSize(myWidth, myHeight) {
  if (myWidth <= myHeight) unitSize = Math.floor(myWidth / 72)
  if (myHeight <= myWidth) unitSize = Math.floor(myHeight / 72)
}

window.onload = function() {
  init()
  window.addEventListener('resize', init, false)
  window.addEventListener("orientationchange", init, false)
}
function init() {
  myWidth = window.innerWidth - 5
  myHeight = window.innerHeight -5 
  ctx.canvas.width = myWidth
  ctx.canvas.height = myHeight
  setUnitSize(myWidth, myHeight)
}

init()

let t = performance.now()
let deltat = 10

let PLAYER_LIST = {}
let myId = 0

function degrees_to_radians(degrees)
{
  let pi = Math.PI;
  return degrees * (pi/180);
}

function Resize_Nearest_Neighbour( img, scale ){
  //make shortcuts for image width and height
  let w = img.width;
  let h = img.height;

  //---------------------------------------------------------------
  //draw the original image to a new canvas
  //---------------------------------------------------------------

  //set up the canvas
  let c = document.createElement("CANVAS");
  let ctxn = c.getContext("2d");
  //disable antialiasing on the canvas
  ctxn.imageSmoothingEnabled = false;
  //size the canvas to match the input image
  c.width = w;
  c.height = h;
  //draw the input image
  ctxn.drawImage( img, 0, 0 );
  //get the input image as image data
  let inputImg = ctxn.getImageData(0,0,w,h);
  //get the data array from the canvas image data
  let data = inputImg.data;

   //---------------------------------------------------------------
  //resize the canvas to our bigger output image
  //---------------------------------------------------------------
  c.width = w * scale;
  c.height = h * scale;
  //---------------------------------------------------------------
  //loop through all the data, painting each pixel larger
  //---------------------------------------------------------------
  for ( let i = 0; i < data.length; i+=4 ){

      //find the colour of this particular pixel
      let colour = "#";

      //---------------------------------------------------------------
      //convert the RGB numbers into a hex string. i.e. [255, 10, 100]
      //into "FF0A64"
      //---------------------------------------------------------------
      function _Dex_To_Hex( number ){
          let out = number.toString(16);
          if ( out.length < 2 ){
              out = "0" + out;
          }
          return out;
      }
      for ( let colourIndex = 0; colourIndex < 3; colourIndex++ ){
          colour += _Dex_To_Hex( data[ i+colourIndex ] );
      }
      //set the fill colour
      ctxn.fillStyle = colour;

      //---------------------------------------------------------------
      //convert the index in the data array to x and y coordinates
      //---------------------------------------------------------------
      let index = i/4;
      let x = index % w;
      //~~ is a faster way to do 'Math.floor'
      let y = ~~( index / w );
      //---------------------------------------------------------------
      //draw an enlarged rectangle on the enlarged canvas
      //---------------------------------------------------------------
      if (colour != '#ff00dc') ctxn.fillRect( x*scale, y*scale, scale, scale );
  }

  //get the output image from the canvas
  let output = c.toDataURL("image/png");
  //returns image data that can be plugged into an img tag's src
  return output;
}

function drawImage(img, x, y, width, height, deg, flip, flop, center) {

  ctx.save();
  
  if(typeof width === "undefined") width = img.width;
  if(typeof height === "undefined") height = img.height;
  if(typeof center === "undefined") center = false;
  
  // Set rotation point to center of image, instead of top/left
  if(center) {
      x -= width/2;
      y -= height/2;
  }
  
  // Set the origin to the center of the image
  ctx.translate(x + width/2, y + height/2);
  
  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - deg * Math.PI / 180;    
  ctx.rotate(rad);
  
  // Flip/flop the canvas
  if(flip) flipScale = -1; else flipScale = 1;
  if(flop) flopScale = -1; else flopScale = 1;
  ctx.scale(flipScale, flopScale);
  
  // Draw the image    
  ctx.drawImage(img, -width/2, -height/2, width, height);
  
  ctx.restore();
}