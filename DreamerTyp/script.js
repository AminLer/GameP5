var canvas = document.getElementById("mainCanvas");
var canvasContext = canvas.getContext("2d");

var width = canvas.width, height = canvas.height, speed = 10;

var keys = [];
var score = 0;
var player = {
    x: 40,
    y: 40,
    width: 20,
    height: 20
};
var cube = {
    x: Math.random() * (width - 20),
    y: Math.random() * (height - 20),
    width: 20,
    height: 20
};

//
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
}, false);
//delets the keycode after key is release
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
}, false);

/*
left - 37
up - 38
right - 39
down - 40
*/

function game(){
    update();
    render();
}

function update(){
    if(keys[37]){player.x -= speed;}
    if(keys[38]){player.y -= speed;}
    if(keys[39]){player.x += speed;}
    if(keys[40]){player.y += speed;}
    
    if(player.x < 0) player.x = 0;
    if(player.y < 0) player.y = 0;
    if(player.x > width-player.width) player.x = width-player.width;
    if(player.y > height-player.height) player.y = height-player.height;
    
    if(collision(player, cube)) process();
    
}
function render(){
    canvasContext.clearRect(0, 0, width, height);
    
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(player.x, player.y, player.width, player.height);
   
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(cube.x, cube.y, cube.width, cube.height);
    
    canvasContext.fillStyle ="black";
    canvasContext.font = "bold 30px helvetica";
    canvasContext.fillText(score, 10, 30);
    
}

function process(){
    score++;
    cube.x = Math.random() *(width-20);
    cube.y = Math.random() *(height-20);
}

function collision(first, second){
    return !(first.x > second.x + second.width || first.x+first.width < second.x || first.y > second.y+second.height || first.y+first.height < second.y);
}
setInterval(function(){
    game();
}, 1000/30)