let ax = 0;
let ay = 0;
const ball_r = 20; //玉の大きさ
const LINE_WIDTH = 5;　//線の太さ

window.onload = () => { 
    let canvas = $("bord");
    let ctx = canvas.getContext("2d");
    
    let x = LINE_WIDTH+ball_r;
    let y = LINE_WIDTH+ball_r;

    //ボール動き
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ball_r, 0, Math.PI * 2);
        ctx.fillStyle = "#DD9500";
        ctx.fill();
        ctx.closePath();
    }
    //ボールを動かす
    function ballmove() { 
        let g = 8;
        ax = ax / 90;
        ay = ay / 180*3;

        //枠から出ないように
        if (x < 0+ball_r+LINE_WIDTH) {
            x = 0 + ball_r + LINE_WIDTH;
        } else if (x > canvas.width - ball_r -LINE_WIDTH) {
            x = canvas.width - ball_r - LINE_WIDTH;
        } else {
            x = x + g * ax; 
        }

        if (y < 0+ball_r+LINE_WIDTH) {
            y = 0 + ball_r + LINE_WIDTH;
        } else if(y>canvas.height-ball_r-LINE_WIDTH){ 
            y = canvas.height - ball_r - LINE_WIDTH; 
        }else { 
            y = y + g * ay;
        }

        //障害物判定
        if (0<x < 250 + ball_r && 0<y < 80 + ball_r) {
            y = 80 - ball_r;
        } else if (x > 80 + ball_r && y > 160 + ball_r) {
            y = 160 - ball_r;

        }

    }

    //フレーム描画
    function drawFrame() { 
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, LINE_WIDTH);
        ctx.fillRect(0, canvas.height - LINE_WIDTH, canvas.width, canvas.height);
        ctx.fillRect(0, 0, LINE_WIDTH, canvas.height);
        ctx.fillRect(canvas.width - LINE_WIDTH, 0, canvas.width, canvas.height);

        //障害
        ctx.fillRect(0, 80, 250, LINE_WIDTH);
        ctx.fillRect(80, 160, 300, LINE_WIDTH);
        
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
        + "y: " + ay +" </br>"         // y軸の値
        + "  テスト4";                 
}
function $(id) { return document.getElementById(id); }

//加速度センサーの値が変化したら実行
window.addEventListener('deviceorientation', (dat) => {
    ax = dat.gamma;
    ay = dat.beta;
});