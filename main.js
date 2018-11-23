let ax = 0;
let ay = 0;
let az = 0;

window.onload = () => { 
    let canvas = $("bord");
    let ctx = canvas.getContext("2d");
    
    let x = canvas.width/2;
    let y = canvas.height/2;

    //ボール動き
    function drawBall() {
        let g = 9.80665;
        let d = x / g;
        ctx.beginPath();
        ctx.arc(x-d*ax, y-d*ay, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    setInterval(draw, 10);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        displayData();
    }

    
}
function displayData() {
    let txt = $("text")  // データを表示するdiv要素の取得
    txt.innerHTML = "x: " + ax + "<br>"         // x軸の値
        + "y: " + ay + "<br>"         // y軸の値
        + "z: " + az;                 // z軸の値
}
function $(id) { return document.getElementById(id); }
//加速度センサーの値が変化したら実行
window.addEventListener("devicemotion", (dat) => {
    ax = dat.accelerationIncludingGravity.x;
    ay = dat.accelerationIncludingGravity.y;
    az = dat.accelerationIncludingGravity.z;
});