window.onload = () => { 

    let ax = 0;
    let ay = 0;
    let az = 0;
    //加速度センサーの値が変化したら実行
    window.addEventListener("devicemotion", () => {
        ax = dat.accelerationIncludingGravity.x;
        aY = dat.accelerationIncludingGravity.y;
        aZ = dat.accelerationIncludingGravity.z;
    });

    function displayData() {
        let  txt =$("text")  // データを表示するdiv要素の取得
        txt.innerHTML = "x: " + aX + "<br>"         // x軸の値
            + "y: " + aY + "<br>"         // y軸の値
            + "z: " + aZ;                 // z軸の値
    }



    let canvas = $("bord");
    let ctx = canvas.getContext("2d");
    
    let x = 100;
    let y = 100;
    let dx = 2;
    let dy = -2;

    //ボール動き
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    setInterval(draw, 10);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        displayData();
        x += dx;
        y += dy;
    }

    function $(id) { return document.getElementById(id); }
}