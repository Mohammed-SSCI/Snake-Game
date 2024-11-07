const gameBoard = document.getElementById('gameBoard');
const boardSize = 600;
const tileSize = 20;
var S=0;
var highscore=0;
var audioB = new Audio('Snake Jazz.mp3');
let snake = [
    { x: 14, y: 14 }
];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) };
let score = 0;
let speed = 150;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:
            if (direction.x === 0) direction = { x: -1, y: 0 }; // Left arrow
            break;
        case 38:
            if (direction.y === 0) direction = { x: 0, y: -1 }; // Up arrow
            break;
        case 39:
            if (direction.x === 0) direction = { x: 1, y: 0 }; // Right arrow
            break;
        case 40:
            if (direction.y === 0) direction = { x: 0, y: 1 }; // Down arrow
            break;
    }
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        EndB(audioB);
        endS();
        setTimeout(Gameover, 1500);
        // Gameover();
        
        setTimeout(resetGame, 1501);
        return;
    }
    // if (checkFoodCollision()) {
        
    //     growSnake();
    //     placeFood();
        
    // }
    draw();
    setTimeout(gameLoop, speed);
}
function Gameover(){
    alert('Game Over! NOOOOO  Score: '+S);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize / tileSize || head.y < 0 || head.y >= boardSize / tileSize) {
        direction = { x: 0, y: 0 };
        return true;
    }
    else if(head.x === food.x && head.y === food.y){
        crunchS();
        growSnake();
        placeFood();
        return false;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            direction = { x: 0, y: 0 };
            return true;
        }
    }
    return false;
}

// function checkFoodCollision() {
//     const head = snake[0];
    
//     return head.x === food.x && head.y === food.y;
// }

function growSnake() {
    snake.push({ ...snake[snake.length - 1] });
    score++;
    S=S+1;
    document.getElementById('HS').innerText = `Score: ${S}`;
   
    if (score % 5 === 0) {
        speed -= 10;
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 30)
    };
}

function draw() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x * tileSize}px`;
        snakeElement.style.top = `${segment.y * tileSize}px`;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x * tileSize}px`;
    foodElement.style.top = `${food.y * tileSize}px`;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function resetGame() {
    snake = [{ x: 14, y: 14 }];
    direction = { x: 0, y: 0 };
    score = 0;
    S=0;
    speed = 150;
    refresh();

}
function EndB(audioB){
    audioB.pause();
}
function BackgroundM(audioB){
    audioB.loop = true;
    audioB.play();
    
    }
       

    
    

function refresh(){
    location.reload();
}
function endS(){
    var audioE = new Audio('mixkit-wrong-answer-fail-notification-946.mp3');
    audioE.play();
}

function crunchS(){
    var audio = new Audio('apple-crunch-215258.mp3');
    audio.play();

}

// function loopB(){
//     BackgroundM()
//     setTimeout(BackgroundM(),100000)
//     setTimeout(BackgroundM(),200000)
//     setTimeout(BackgroundM(),300000)
//     setTimeout(BackgroundM(),400000)
// }
gameBoard.style.display = 'none';
function startgame(){
    document.getElementById("bg").style.display='none';
    gameBoard.style.display = 'block';
    BackgroundM(audioB)
placeFood();
draw();

setTimeout(gameLoop, speed);} 
