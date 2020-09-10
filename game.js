var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var snakeW = 15;
var SnakeH = 15;
var dir = "right";
var countScore = 0;

//create snake
function drawSnake(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakeW, y * SnakeH, snakeW, SnakeH);
    ctx.fillStyle = "#1d2d50";
    ctx.strokeRect(x * snakeW, y * SnakeH, snakeW, SnakeH);
}

const len = 4;
snake = [];
for (var i = len - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    });
}

//control direction
document.addEventListener("keydown", dirControl);
function dirControl(event) {
    if (event.keyCode == 37 && dir != "right") dir = "left";
    if (event.keyCode == 38 && dir != "down") dir = "up";
    if (event.keyCode == 39 && dir != "left") dir = "right";
    if (event.keyCode == 40 && dir != "up") dir = "down";
}

//create food

var food = {
    x: Math.round(Math.random() * (cvs.width / snakeW - 1)),
    y: Math.round(Math.random() * (cvs.height / SnakeH - 1))
};

function drawFood(x, y) {
    ctx.fillStyle = "#2980B9";
    ctx.fillRect(x * snakeW, y * SnakeH, snakeW, SnakeH);
    ctx.fillStyle = "black";
    ctx.strokeRect(x * snakeW, y * SnakeH, snakeW, SnakeH);
}

//draw function
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (var i = 0; i < snake.length; i++) {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawSnake(X, Y);
    }
    drawFood(food.x, food.y);

    //scoreboard
    ctx.fillStyle = "#82E3E1";
    ctx.font = "20px Roboto";
    ctx.fillText("SCORE:", 45, 40);
    ctx.font = "25px Roboto";
    ctx.fillText(countScore, 65, 65);

    // snake head
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    //snake touches the boundary
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= cvs.width / snakeW ||
        snakeY >= cvs.height / SnakeH
    ) {
        endGame();
    }
    didCollide();
    //snake crosses the boundary

    if (dir == "right") snakeX++;
    else if (dir == "left") snakeX--;
    else if (dir == "up") snakeY--;
    else if (dir == "down") snakeY++;

    //when snake touches food
    if (snakeX == food.x && snakeY == food.y) {
        updateScore();
        //create food

        food = {
            x: Math.round(Math.random() * (cvs.width / snakeW - 1)),
            y: Math.round(Math.random() * (cvs.height / SnakeH - 1))
        };
        //new head
        var newHead = {
            x: snakeX,
            y: snakeY
        };
    } else {
        snake.pop();
        //new head
        var newHead = {
            x: snakeX,
            y: snakeY
        };
    }

    snake.unshift(newHead);
} //end draw function

function didCollide() {
    for (let i = 1; i < snake.length; i++) {
        if (
            snake.length > 4 &&
            snake[0].x == snake[i].x &&
            snake[0].y == snake[i].y
        )
            endGame();
    }
}

//Update Score Function
function updateScore() {
    countScore += 10;
    // document.getElementById("score").innerHTML = countScore;
}
function endGame() {
    clearInterval(timer);
    alert("GAME OVER");
}

var timer = setInterval(draw, 100);
