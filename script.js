
let score = 0;
let scoreCont = document.getElementById('scoreCont');
let cross = true;

 audio = new Audio('level-up-sound-320174.mp3');
 audiogo= new Audio('game-over-deep-male-voice-clip-352695 (1).mp3');
setTimeout(() => {
    audiogo.play();
    audio.pause();
}, 100); // 100ms delay (or whatever you prefer)



document.onkeydown = function (e) {
    console.log("Key code is:", e.keyCode);

    let dino = document.querySelector('.dino');

    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39) {
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }

    if (e.keyCode == 37) {
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
};

setInterval(() => {
    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');
    let gameOver = document.querySelector('.gameOver');

    let dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 13 && offsetY < 52) {
        gameOver.innerHTML="Game Over- Reload To Start Over"
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        audiogo.play(()=>{
            // audiogo.pause();
            audio.pause();
        },1000);
    } else if(offsetX< 145 && cross ){
        score += 1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true ;
        },1000);
        setTimeout(() => {
            cross=true;
       
        aniDur= parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        newDur =aniDur-0.1;
        obstacle.style.animationDuration = newDur +'s';
     }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}






