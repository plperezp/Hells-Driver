//! ELEMENTOS PRINCIPALES DEL DOM

// PANTALLAS DEL JUEGO
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// BOTONES
const startBtnNode = document.querySelector("#start-game-btn");

// GAME-BOX
const gameBoxNode = document.querySelector("#game-box");

//! VARIABLES GLOBALES DEL JUEGO
let mainCar = null;
let enemyCarArray = []
let frecuenciaEnemyCar = 2500
let gameIntervalId = null;
let enemyCarIntervalId = null;




//!FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  //1.- CAMBIAR LAS PANTALLAS

  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //2.- AÑADIR TODOS LOS ELEMENTOS INICIALES DEL JUEGO

  mainCar = new MainCar();

  //3 INTERVALOS DE JUEGO
  
  gameIntervalId = setInterval(() =>{
    gameLoop()
    },Math.round(1000/60)) //60fps
    enemyCarIntervalId = setInterval (() => {
      addEnemyCar()
      }, frecuenciaEnemyCar)
    
 
    


}
function addEnemyCar(){
  let randomPositionX = Math.floor(Math.random() *(320) )

  let newEnemyCarLeft = new EnemyCar (randomPositionX)
  enemyCarArray.push(newEnemyCarLeft)
    
 let newEnemyCarRight = new EnemyCar (randomPositionX + 400)
 enemyCarArray.push(newEnemyCarRight)
    
    
    console.log(enemyCarArray)


}

function detectIfCarEnemyLeave(){

  if(enemyCarArray.length === 0){
    return // no ejecutar la funcion si el array esta vacío
  }
  

  if((enemyCarArray[0].y + enemyCarArray[0].h) >= gameBoxNode.offSetHeight){
    enemyCarArray[0].node.remove() // 1.-sacar del DOM
    enemyCarArray.shift() // 2.- sacarlo de JS
    
  
}
}

function gameLoop(){
  // se ejecuta 60 veces por segundo en el intervalo principal
  enemyCarArray.forEach((eachEnemyCar) =>{
    eachEnemyCar.automaticMovement()
  })
  detectIfCarEnemyLeave()
  
}
function gameOver(){

  //1. limpiar los intervalos
clearInterval(gameIntervalId);
clearInterval(enemyCarIntervalId);

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display ="flex"
}
//!EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);
window.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    mainCar.mainCarMovement("left");
  } else if (event.key === "d") {
    mainCar.mainCarMovement("right");
  } else if (event.key === "w") {
    mainCar.mainCarMovement("up");
  } else if (event.key === "s") {
    mainCar.mainCarMovement("down");
  }
});

//! PLANIFICACION

//Crear la clase del coche CHECK!
//Crear la clase de los mainstreamers
//Crear la clase de los perroflautas
//Crear la clase del coche rival

//los mainstream y perroflautas aparecen de manera random
//los mainstream y perroflautas deben desaparecer (dejar de exisitir en js, dejar de exisitir en el DOM)

//los coches rivales aparecen de manera random
//los coches deben desaparecer (dejar de exisitir en js, dejar de exisitir en el DOM)

//colisiones coche contra mainstreamers (aumenta score)
//colisiones coche contra perroflautas (aumenta score)
//colisiones coche contra coches (game-over)

//colision coche contra los margenes (game over)
