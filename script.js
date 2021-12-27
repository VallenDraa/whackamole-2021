

// Menu Event Listeners
const menu = document.querySelector(".menu");
const mainWindow = document.querySelector(".main-window");
const gameWindow = document.querySelector(".game-window");
const optionWindow = document.querySelector(".option-window");
const toOptions = document.querySelector(".options")
const menuBack = document.querySelector(".menu-back");
const optionBack = document.querySelector(".opt-back");
let inGame = false;
mainWindow.addEventListener("click", function(e) {
    if (e.target.classList.contains("play")){
        gameWindow.style.display = "grid";
        mainWindow.style.display = "none";
        inGame = true;
        console.log(inGame)
    }
})
menuBack.addEventListener("click", function() {
    backToMenu()
})
toOptions.addEventListener("click", function(){
    optionWindow.style.display = "block";
    mainWindow.style.display = "none";
})
optionBack.addEventListener("click", function() {
    optionWindow.style.display = "none";
    mainWindow.style.display = "block";
})
function backToMenu(){
    gameWindow.style.display = "none";
    mainWindow.style.display = "block";
    inGame = false;
    refreshSpeed = 1200;
    for (let i = 0; i <hitbox.length; i++) {
        hitbox[i].style.backgroundImage = "none"
    }
}



// The Hitbox Algorithms
let refreshSpeed = 1200;
var stopRepeat = 0;
let gameTime = 0;
let bonus = false;
const levelUp = new Audio("./mp3/levelUp.mp3")
const hitbox = document.querySelectorAll(".hitbox");
const scoreGame = document.querySelector(".score-game");
const heart  = document.querySelectorAll(".fas")
function hitboxImg(){
    if(inGame){
        // generate random placement algorithm
        let boxIndicator;
        while(boxIndicator == stopRepeat){
            boxIndicator = Math.floor(Math.random() * 9); 
        }
        stopRepeat = boxIndicator
        
        for (let i = 0; i <hitbox.length; i++) {
            hitbox[i].style.animation="none"
            if(i == boxIndicator){
                hitbox[i].style.backgroundImage = "url('./svg/mole.svg')";
                hitbox[i].style.backgroundSize= "60%";
                hitbox[i].classList.remove("flower")
                hitbox[i].classList.add("mole")
            }
            else{
                hitbox[i].style.backgroundImage = "url('./svg/flower.svg')";
                hitbox[i].style.backgroundSize= "40%";
                hitbox[i].classList.remove("mole")
                hitbox[i].classList.add("flower")
            }
            if(refreshSpeed >= 600){
                hitbox[i].style.animation=`resize-pic ${refreshSpeed}ms ease infinite`
            }
        }   
    }
}
let refreshImage = setInterval(hitboxImg,refreshSpeed );
// increase the speed
setInterval(function(){
    if(inGame){ 
        gameTime++;
        if(gameTime % 10 == 0){
            if(refreshSpeed !=600){
                refreshSpeed-= 100;
            }
            if(refreshSpeed >= 600){
                clearInterval(refreshImage);
                levelUp.play();
                levelUp.volume = 0.2;
                refreshImage = setInterval(hitboxImg,refreshSpeed);   
            }
        } 
    }
   
},1000)    





// hitting the hitbox algorithm 
const bonk = new Audio("./mp3/bonk.mp3")
const wrong = new Audio("./mp3/wrong.mp3")
let scoreValue = 1;
let life = 3;
gameWindow.addEventListener("click",function(e){
    if(e.target.classList.contains("hitbox")){
        if(e.target.classList.contains("mole")){
            scoreGame.innerHTML = `SCORE: ${scoreValue++}`  
            bonk.play();
            bonk.volume = 0.5;
        } 
        else if(e.target.classList.contains("flower")){
            wrong.play()
            bonk.volume = 0.05;
            life--;
            }
        
        // Life Algorithm
        if(life < 3 && life !=0){
            heart[life].classList.replace("fas","far")
        }
        else if(life == 0){
            heart[life].classList.replace("fas","far")
            alert("You Lost !");
            life = 3;
            scoreValue =0;
            refreshSpeed = 1200;
            scoreGame.innerHTML = `SCORE: 0`  
            for (let i = 0; i <heart.length; i++) {
                heart[i].classList.replace("far","fas")
            }
            backToMenu()
        }

        // Adding click animation
        e.target.style.animation = "hitbox-click-animation 200ms ease"
    }
})

