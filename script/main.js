//! ELEMENTOS PRINCIPALES DEL DOM
 
// PANTALLAS DEL JUEGO
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// BOTONES
const startBtnNode = document.querySelector("#start-game-btn")

// GAME-BOX
const gameBoxNode = document.querySelector("#game-box")

//! VARIABLES GLOBALES DEL JUEGO
let mainCar = null;
let gameIntervalId = null;


//!FUNCIONES GLOBALES DEL JUEGO
function startGame (){
  console.log("iniciando juego")
  
  //1.- CAMBIAR LAS PANTALLAS
  
  splashScreenNode.style.display = "none"
  gameScreenNode.style.display = "flex"
  
  //2.- AÑADIR TODOS LOS ELEMENTOS INICIALES DEL JUEGO
  
  mainCar = new MainCar()
 
  //3 INTERVALO DE JUEGO

  gameIntervalId = setInterval(() =>{
    gameLoop()
    },Math.round(1000/60))
  
 
    

  
  }

//!EVENT LISTENERS

startBtnNode.addEventListener("click",startGame)
window.addEventListener("keydown", (event) => {
  if(event.key === "a"){
    mainCarMovement ("left")
  }else if(event.key === "d"){
    mainCarMovement("right")
  }else if(event.key === "w"){
    mainCarMovement("up")
  }else if(event.key === "s"){
    mainCarMovement("down")
  }    
})



//! PLANIFICACION

//Crear la clase del coche CHECK! pero el coche no se mueve
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