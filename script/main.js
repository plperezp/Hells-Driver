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

//MAIN CAR
let mainCar = null;
let gameIntervalId = null;

//ENEMY CAR
let enemyCarArray = [];
let frecuenciaEnemyCar = 2500;
let enemyCarIntervalId = null;

//MAINSTREAMER
let mainstreamArray = [];
let mainstreamIntervalId = null;
let frecuenciaMainstream = 1000;

//HIPPIES

let hippiesArray = [];
let frecuenciaHippies = 1000;
let hippiesIntervalId = null;






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
    
    mainstreamIntervalId = setInterval(() =>{
      addMainstream()
    }, frecuenciaMainstream)
    
    HippiesIntervalId = setInterval(() =>{
      addHippies()
    }, frecuenciaHippies)
 
    


}
function addEnemyCar(){
  let randomPositionX = Math.floor(Math.random() *(320) )

  let newEnemyCarLeft = new EnemyCar (randomPositionX)
  enemyCarArray.push(newEnemyCarLeft)
    
 let newEnemyCarRight = new EnemyCar (randomPositionX + 400)
 enemyCarArray.push(newEnemyCarRight)
    
    
    console.log(enemyCarArray)


}
function addMainstream(){
  let randomPositionY = Math.floor(Math.random() *(250) )

  let newMainstream = new Mainstream (randomPositionY)
  mainstreamArray.push(newMainstream)
}
function addHippies(){
  let randomPositionY = Math.floor(Math.random() *(600) )
  console.log(randomPositionY)
  let newHippies = new Hippies (randomPositionY)
  hippiesArray.push(newHippies)
}
function detectIfHippiesLeave(){

  if(hippiesArray.length === 0){
    return // no ejecutar la funcion si el array esta vacío
  }
  

  if((hippiesArray[0].x + hippiesArray[0].w) >= gameBoxNode.offsetWidth){
    hippiesArray[0].node.remove() // 1.-sacar del DOM
    hippiesArray.shift() // 2.- sacarlo de JS
    
  
}
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

function detectIfMainstreamLeave(){

  if(mainstreamArray.length === 0){
    return 
  }

  if((mainstreamArray[0].x + mainstreamArray[0].w)<= 0){
    mainstreamArray[0].node.remove() // 1.-sacar del DOM
    mainstreamArray.shift() // 2.- sacarlo de JS
    
  }
}

function detectCarCrashMainstream(){
  


  mainstreamArray.forEach((eachMainstream) =>{
    
  
  if (mainCar.x < eachMainstream.x + eachMainstream.w &&
    mainCar.x + eachMainstream.w > eachMainstream.x &&
    mainCar.y < eachMainstream.y + eachMainstream.h &&
    mainCar.y + eachMainstream.h > eachMainstream.y) {
      eachMainstream.node.src = "./img/sangre.png"
     
      setTimeout(()=>{

        eachMainstream.node.style.display = "none"
        
      },300)
      
    }
   
    
  }) 
  
  
  
}
function detectCarCrashHippies(){
  


  hippiesArray.forEach((eachHippie) =>{
    
  
  if (mainCar.x < eachHippie.x + eachHippie.w &&
    mainCar.x + eachHippie.w > eachHippie.x &&
    mainCar.y < eachHippie.y + eachHippie.h &&
    mainCar.y + eachHippie.h > eachHippie.y) {
      eachHippie.node.src = "./img/sangre.png"
     
      setTimeout(()=>{

        eachHippie.node.style.display = "none"
        
      },300)
      
    }
   
    
  }) 
}
function gameLoop(){
  // se ejecuta 60 veces por segundo en el intervalo principal
  enemyCarArray.forEach((eachEnemyCar) =>{
    eachEnemyCar.automaticMovement()
  })
  mainstreamArray.forEach((eachMainstream) =>{
    eachMainstream.automaticMovement()
  })
  hippiesArray.forEach((eachHippie) =>{
    eachHippie.automaticMovement()
  })

  detectIfCarEnemyLeave()
  detectCarCrashEnemyCar()
  detectIfMainstreamLeave()
  detectCarCrashMainstream()
  detectIfHippiesLeave()
  detectCarCrashHippies()
}
function gameOver(){

  //1. limpiar los intervalos
clearInterval(gameIntervalId);
clearInterval(enemyCarIntervalId);
clearInterval(HippiesIntervalId)
clearInterval(mainstreamIntervalId)

  gameScreenNode.style.display = "none"
  gameOverScreenNode.style.display ="flex"
}
function detectCarCrashEnemyCar(){
  


enemyCarArray.forEach((eachCarEnemy) =>{

if (mainCar.x < eachCarEnemy.x + eachCarEnemy.w &&
  mainCar.x + eachCarEnemy.w > eachCarEnemy.x &&
  mainCar.y < eachCarEnemy.y + eachCarEnemy.h &&
  mainCar.y + eachCarEnemy.h > eachCarEnemy.y) {
    mainCar.node.src = "./img/explosion.png"
    setTimeout(() =>{
      gameOver()
    }, 300)
  }
  // Collision detected!
  
}) 



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
//Crear la clase de los mainstreamers CHECK!
//Crear la clase de los perroflautas
//Crear la clase del coche rival CHECK!

//los mainstream y hippies aparecen de manera random
//los mainstream y hippies deben desaparecer (dejar de exisitir en js, dejar de exisitir en el DOM) CHECK!

//los coches rivales aparecen de manera random CHECK!
//los coches deben desaparecer (dejar de exisitir en js, dejar de exisitir en el DOM) CHECK!

//colisiones coche contra mainstreamers (aumenta score)
//colisiones coche contra perroflautas (aumenta score)
//colisiones coche contra coches (game-over) CHECK!

//colision coche contra los margenes (game over)
