// wtf
const headerText = document.querySelector(".header-text")
const generateHeader = (function(){
    let x = Math.round(Math.random * 1000);
    if(x == 777){
        headerText.textContent = "GUAC-A-MOLE"
    }
    else if(x == 666){
        headerText.textContent = "TAM-A-LE"
    }
    else if(x == 555){
        headerText.textContent = "IKAN-LELE"
    }
    else{
        headerText.textContent = "WHACK-A-MOLE"
    }
}())



// The Hitbox Algorithms
let refreshSpeed = 1200;
let stopRepeat = 0;
let gameTime = 0;
const levelUp = new Audio("./mp3/levelUp.mp3");
const levelGame = document.querySelector(".level-game");
const levelPopup = document.querySelector(".level-popup");
let levelValue = 1;
const scoreGame = document.querySelector(".score-game");
const hitbox = document.querySelectorAll(".hitbox");
const heart  = document.querySelectorAll(".fas");

// animations 
let doShake = true;
let doZoomOut = true;
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
                hitbox[i].classList.remove("flower")
                hitbox[i].classList.add("mole")
                if(doZoomOut) hitbox[i].style.backgroundSize= "60%";

            }
            else{
                hitbox[i].style.backgroundImage = "url('./svg/flower.svg')";
                hitbox[i].style.backgroundSize= "40%";
                hitbox[i].classList.remove("mole")
                hitbox[i].classList.add("flower")
            }
            if(refreshSpeed > 600 && doShake){
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
        if(gameTime % 12 == 0){
            if(refreshSpeed !=600){
                refreshSpeed-= 100;
            }
            if(refreshSpeed > 600){
                clearInterval(refreshImage);
                levelUp.play();
                levelUp.volume = 0.2;
                levelGame.innerHTML = `LEVEL<br>${levelValue++}`;
                levelPopup.classList.add("show-popup")
                refreshImage = setInterval(hitboxImg,refreshSpeed);  
                setTimeout(()=>{
                    levelPopup.classList.remove("show-popup")
                },800)
            }
        } 
    }
   
},1000)    




// Menu Event Listeners
const menu = document.querySelector(".menu");
const playBtn = document.querySelector(".play")
const mainWindow = document.querySelector(".main-window");
const gameWindow = document.querySelector(".game-window");
const optionWindow = document.querySelector(".option-window");
const toOptions = document.querySelector(".options")
const menuBack = document.querySelector(".menu-back");
const optionBack = document.querySelector(".opt-back");
let inGame = false;
let onGoing = false;
mainWindow.addEventListener("click", function(e) {
    if (e.target.classList.contains("play")){
        gameWindow.style.display = "grid";
        mainWindow.style.display = "none";
        inGame = true;
        onGoing = true
    }
})
menuBack.addEventListener("click", function() {
    turnToResumeBtn();
    backToMenu();
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

function turnToResumeBtn(){
    if(onGoing){
        playBtn.textContent = "Resume"
    }
    else{
        playBtn.textContent = "Play"
    }
};



// hitting the hitbox algorithm 
const bonk = new Audio("./mp3/bonk.mp3");
const wrong = new Audio("./mp3/wrong.mp3");
let scoreValue = 1;
let life = 3;
gameWindow.addEventListener("click",function(e){
    if(e.target.classList.contains("hitbox")){
        if(e.target.classList.contains("mole")){
            scoreGame.innerHTML = `SCORE<br>${scoreValue++}`  
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
            levelValue= 1;
            scoreValue =1;
            refreshSpeed = 1200;
            onGoing = false;
            scoreGame.innerHTML = `SCORE<br>0`  
            for (let i = 0; i <heart.length; i++) {
                heart[i].classList.replace("far","fas")
            }
            backToMenu()
            turnToResumeBtn()
        }

        // Adding click animation
        e.target.style.animation = "hitbox-click-animation 200ms ease"
    }
})


// Option Menu Selection
const volumeOption = document.querySelector(".volume-opt");
const shakingOption = document.querySelector(".shaking-opt");
const zoomOption = document.querySelector(".zoom-opt");

volumeOption.addEventListener("input",function(){
    levelUp.volume = this.value - (this.value-0.2);
    bonk.volume = this.value - (this.value-0.5);
    wrong.volume = this.value - (this.value-0.05)
})

shakingOption.addEventListener("change",function(){
    doShake = this.checked;
})

zoomOption.addEventListener("change",function(){
    doZoomOut = this.checked;
})