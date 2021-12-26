// The Menu UI
const menu = document.querySelector(".menu");
const gameWindow = document.querySelector(".game-window");
const menuBack = document.querySelector(".menu-back");

// to stop the algorithms
let inGame = false;

// The main game screen UI
const hitbox = document.querySelectorAll(".hitbox");
const scoreGame = document.querySelector(".score-game");
const heart  = document.querySelectorAll(".fas")
let scoreValue = 1;
let life = 3;

// Website sfx
const bonk = new Audio("./mp3/bonk.mp3")
const wrong = new Audio("./mp3/wrong.mp3")

// the speed of image hitbox refresh
let refreshSpeed = 1200


// Menu Event Listeners
menu.addEventListener("click", function(e) {
    if (e.target.classList.contains("play")){
        gameWindow.style.display = "block";
        menu.style.display = "none";
        inGame = true;
    }
})
menuBack.addEventListener("click", function() {
    backToMenu()
})

function backToMenu(){
    gameWindow.style.display = "none";
    menu.style.display = "block";
    inGame = false;
    for (let i = 0; i <hitbox.length; i++) {
        hitbox[i].style.backgroundImage = "none"
    }
}


// The Hitbox Algorithms
var stopRepeat = 0;
setInterval(function(){
    if(inGame){
        // generate random placement algorithm
        let boxIndicator = 0;
        while(boxIndicator == stopRepeat){
            boxIndicator = Math.floor(Math.random() * 9); 
            console.log(boxIndicator,stopRepeat);
        }
        stopRepeat = boxIndicator
        
        for (let i = 0; i <hitbox.length; i++) {
            hitbox[i].style.animation="none"
            if(i == boxIndicator){
                hitbox[i].style.backgroundImage = "url('./svg/mole.svg')";
                hitbox[i].style.backgroundSize= "40%";
                hitbox[i].classList.remove("flower")
                hitbox[i].classList.add("mole")
            }
            else{
                hitbox[i].style.backgroundImage = "url('./svg/flower.svg')";
                hitbox[i].style.backgroundSize= "40%";
                hitbox[i].classList.remove("mole")
                hitbox[i].classList.add("flower")
            }
            hitbox[i].style.animation=`resize-pic ${refreshSpeed}ms ease infinite`
        }   
    }
},refreshSpeed );

// hitting the hitbox algorithm 
gameWindow.addEventListener("click",function(e){
    if(e.target.classList.contains("hitbox")){
        if(e.target.classList.contains("mole")){
            scoreGame.innerHTML = `SCORE: ${scoreValue++}`  
            bonk.play();
            bonk.volume = 0.5;
        } 
        else if(e.target.classList.contains("flower")){
            wrong.play()
            bonk.volume = 0.5;
            life--;
            console.log(life)
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
            scoreGame.innerHTML = `SCORE: 0`  
            backToMenu()
        }
    }
})
