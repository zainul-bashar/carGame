const showScore = document.querySelector('h3');
const scoringArea = document.querySelector('.scoring-area');
const start = document.querySelector('.start-game');
const gameArea = document.querySelector('.game-area');
const btn = document.getElementById('button');
const scoreId = document.querySelector('#score-id');
let score = 0;
let carposition = {
    x: 0,
    y: 0,
    speed: 5,
}
let player = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}
function startGame(e){
    console.log(e);
    
    start.classList.add('hide');
    const car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    const carTop = car.offsetTop;
    const carLeft = car.offsetLeft;
    carposition.y = carTop;
    carposition.x = carLeft;
    var x = 0;
    for(var i=0; i<4;i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = x+'px';
        gameArea.appendChild(line);
        x+=150;
    }
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.top = Math.floor(Math.random()*400) + 'px';
    enemy.style.top = Math.floor(Math.random()*350) + 'px';
    gameArea.appendChild(enemy);
    window.requestAnimationFrame(renderGame);
}
function handleKeyUp(e){
    e.preventDefault();
    player[e.key] = true;
}
function keyDown(e){
    e.preventDefault();
    player[e.key] = false;
    
}
function moveLine(){
    const lines = document.querySelectorAll('.line');
    console.log(lines);
     lines.forEach(line => {
        var top = line.offsetTop;
        const details = gameArea.getBoundingClientRect();
        if(line.offsetTop > gameArea.bottom){
            top = 0;
        }
        line.style.top = top+carposition.speed +'px';
     });
}
function renderGame(milliseconds){
    moveLine();
    const car = document.querySelector('.car');
    const details = gameArea.getBoundingClientRect();
    if(player.ArrowDown && carposition.y > details.top){
        carposition.y -= carposition.speed;
    }
    if(player.ArrowUp && carposition.y<details.bottom - 500){
        carposition.y += carposition.speed;
    }
    if(player.ArrowRight && carposition.x < details.right - 120){
        carposition.x += carposition.speed;
    }
    if(player.ArrowLeft && carposition.x > 0){
        carposition.x -=carposition.speed;
    }
    score++;
    scoreId.textContent = score;
    car.style.top = carposition.y + 'px';
    car.style.left = carposition.x + 'px';
    window.requestAnimationFrame(renderGame);
};

btn.addEventListener('click',startGame);
document.addEventListener('keyup',handleKeyUp);
document.addEventListener('keydown',keyDown);
