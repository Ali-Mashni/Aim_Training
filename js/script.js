const startBtn = document.querySelector('#start');
const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
const timeEl = document.querySelector('#time-left');
const board = document.querySelector('#board');

let time = 25;
let score = 0;
let timerId = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    startGame();
});

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createBall();
    }
});

function startGame() {
    score = 0;
    time = 25;
    setTime(time);
    timerId = setInterval(decreaseTime, 1000);
    createBall();
}

function decreaseTime() {
    if (time === 0) {
        clearInterval(timerId);
        finishGame();
    } else {
        time--;
        setTime(time);
    }   
}

function setTime(value) {
    let seconds = value < 10 ? `0${value}` : value;
    timeEl.innerHTML = `00:${seconds}`;
}

function finishGame() {
    // Clear the timer and center the final content on the board
    board.style.display = 'flex';
    board.style.justifyContent = 'center';
    board.style.alignItems = 'center';
    board.style.flexDirection = 'column';
    
    board.innerHTML = `<h2>Your score: <span class='primary'>${score}</span></h2>`;
    board.innerHTML += `<a href="#" class="again" id="again">Play again</a>`;
    const againBtn = document.querySelector('#again');
    againBtn.addEventListener('click', restart);
}

function createBall() {
    const ball = document.createElement('div');
    const size = getRandomNumber(20, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    
    ball.classList.add('circle');
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.left = `${x}px`;
    ball.style.setProperty('--start-top', `-${size}px`);
    ball.style.setProperty('--end-top', `${height - size}px`);
    
    board.append(ball);
    
    ball.addEventListener('animationend', () => {
        if (board.contains(ball)) {
            ball.remove();
            createBall();
        }
    });
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function restart(e) {
    e.preventDefault();
    score = 0;
    time = 25;
    board.innerHTML = "";
    board.style.display = '';
    startScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
}
