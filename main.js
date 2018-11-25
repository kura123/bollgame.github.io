let ax = 0;
let ay = 0;
let az = 0;

const LINE_WIDTH = 5;
window.onload = () => { 
    let canvas = $("bord");
    let ctx = canvas.getContext("2d");
    
    let x = canvas.width/2;
    let y = canvas.height/2;

    //ボール動き
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#DD9500";
        ctx.fill();
        ctx.closePath();
    }
    //ボールを動かす
    function ballmove() { 
        let g = 8;
        ax = ax / 90;
        ay = ay / 180;

        if (x < 0) {
            x = 0;
        } else if (x>canvas.width) {
            x = canvas.width;
        } else {
            x = x - g * ax; 
        }

        if (y < 0) {
            y = 0;
        } else if(y>canvas.height){ 
            y = canvas.height; 
        }else { 
            y = y - g * ay;
        }
    }

    //フレーム描画
    function drawFrame() { 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, LINE_WIDTH);
        ctx.fillRect(0, canvas.height - LINE_WIDTH, canvas.width, canvas.height);
        ctx.fillRect(0, 0, LINE_WIDTH, canvas.height);
        ctx.fillRect(canvas.width - LINE_WIDTH, 0, canvas.width, canvas.height);
    }

    //30msごとに描画
    setInterval(draw, 30);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        displayData();
        drawFrame();
        ballmove();
        drawBall();
        
        
    }

    
}
//データを表示
function displayData() {
    let txt = $("text")  // データを表示するdiv要素の取得
    txt.innerHTML = "x: " + ax  +" "        // x軸の値
        + "y: " + ay +" "         // y軸の値
        + "z: " + az+"   テスト１";                 // z軸の値
}
function $(id) { return document.getElementById(id); }

//加速度センサーの値が変化したら実行
window.addEventListener('deviceorientation', (dat) => {
    ax = dat.gamma;
    ay = dat.beta;
});