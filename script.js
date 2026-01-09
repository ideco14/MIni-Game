const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let level = 1;
let time = 30;

let platform = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 12,
    dx: 6,
    color: "#0077b6"
};

let balls = [];

function spawnBall() {
    balls.push({
        x: Math.random() * (canvas.width - 20),
        y: 0,
        radius: 10,
        dy: 3 + level * 0.5,
        color: "hsl(" + Math.random() * 360 + ", 80%, 50%)"
    });
}

// Platformni harakatlantirish
document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft" && platform.x > 0){
        platform.x -= platform.dx;
    } else if(e.key === "ArrowRight" && platform.x + platform.width < canvas.width){
        platform.x += platform.dx;
    }
});

// Chizish funksiyalari
function drawPlatform(){
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function drawBall(ball){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// O‘yinni yangilash
function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlatform();

    balls.forEach((ball, index) => {
        ball.y += ball.dy;
        drawBall(ball);

        // Ballni ushlash
        if(ball.y + ball.radius > platform.y &&
           ball.x > platform.x && ball.x < platform.x + platform.width){
            score++;
            balls.splice(index,1);
            spawnBall();

            // Level oshirish
            if(score % 5 === 0){
                level++;
            }
        }

        // Agar ball tushib ketsa
        if(ball.y > canvas.height){
            balls.splice(index,1);
            spawnBall();
        }
    });

    // Score, level va vaqt
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("level").innerText = "Level: " + level;
    document.getElementById("time").innerText = "Time: " + time;
}

// Ballni boshlash
for(let i=0;i<3;i++){
    spawnBall();
}

// Vaqtni kamaytirish
let timer = setInterval(() => {
    time--;
    if(time <= 0){
        clearInterval(timer);
        alert("Game Over! Score: " + score + " | Level: " + level);
        location.reload();
    }
},1000);

// O‘yin loop
setInterval(updateGame, 20);
