//! ELEMENTOS PRINCIPALES DEL DOM

// PANTALLAS DEL JUEGO
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
let scoreNode = document.querySelector("#score");
let finalScoreNode = document.querySelector("#final-score");
let playAudioNode = document.querySelector("#audio-btn");
let pauseAudioNode = document.querySelector("#pause-audio-btn");
let scoreListNode = document.querySelector("#scoreList");
//AUDIO

let audioGame = new Audio("./audio/game-music.mp3");
audioGame.volume = 0.1;
let gameOverAudio = new Audio("./audio/game-over.mp3");
gameOverAudio.volume = 0.1;
let crashCarAudio = new Audio("./audio/car-crash.wav");
crashCarAudio.volume = 0.08;
let atropelloAudio = new Audio("./audio/atropello.mp3");
atropelloAudio.volume = 0.08;
let beerAudio = new Audio("./audio/beer-drunk.mp3");
beerAudio.volume = 0.5;

// BOTONES
const startBtnNode = document.querySelector("#start-game-btn");
const restartBtnNode = document.querySelector("#restart-game-btn");
// GAME-BOX
const gameBoxNode = document.querySelector("#game-box");

//! VARIABLES GLOBALES DEL JUEGO
let score = 0;
let puntuaciones = JSON.parse(localStorage.getItem("scores")) || [];
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
let frecuenciaMainstream = 3000;

//HIPPIES

let hippiesArray = [];
let frecuenciaHippies = 3000;
let hippiesIntervalId = null;

//BEERBOOSTER

let BeerBoosterArray = [];
let frecuenciaBeer = 5000;
let BeerBoosterIntervalId = null;

let isGoingEnding = false;

//!FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  //1.- CAMBIAR LAS PANTALLAS
  score = 0;
  scoreListNode.innerHTML = "";
  audioGame.play();

  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //2.- AÑADIR TODOS LOS ELEMENTOS INICIALES DEL JUEGO

  mainCar = new MainCar();

  //3 INTERVALOS DE JUEGO

  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //60fps
  enemyCarIntervalId = setInterval(() => {
    addEnemyCar();
  }, frecuenciaEnemyCar);

  mainstreamIntervalId = setInterval(() => {
    addMainstream();
  }, frecuenciaMainstream);

  HippiesIntervalId = setInterval(() => {
    addHippies();
  }, frecuenciaHippies);

  BeerBoosterIntervalId = setInterval(() => {
    addBeerBooster();
  }, frecuenciaBeer);
  console.log(score);
}

function saveAndshowScores() {
  puntuaciones.unshift(score);
  console.log(puntuaciones);

  // sort

  puntuaciones.sort((a, b) => {
    b.score - a.score;
  });

  let mejoresScores = puntuaciones.slice(0, 5);
  localStorage.setItem("scores", JSON.stringify(mejoresScores));
  console.log(mejoresScores);
  scoreListNode.innerHTML = "";

  mejoresScores.forEach((score, index) => {
    const lista = document.createElement("li");
    lista.innerText = `Conductor ${index + 1}: ${score} puntos `;
    scoreListNode.appendChild(lista);
  });
}
//FUNCIONES ADD

function addEnemyCar() {
  let randomPositionX = Math.floor(Math.random() * 320);

  let newEnemyCarLeft = new EnemyCar(randomPositionX);
  enemyCarArray.push(newEnemyCarLeft);

  let newEnemyCarRight = new EnemyCar(randomPositionX + 400);
  enemyCarArray.push(newEnemyCarRight);
}
function addMainstream() {
  let randomPositionY = Math.floor(Math.random() * 250);

  let newMainstream = new Mainstream(randomPositionY);
  mainstreamArray.push(newMainstream);
}
function addHippies() {
  let randomPositionY = Math.floor(Math.random() * 600);

  let newHippies = new Hippies(randomPositionY);
  hippiesArray.push(newHippies);
}
function addBeerBooster() {
  let randomPositionY = Math.floor(Math.random() * 650);
  let newBeerBooster = new BeerBooster(randomPositionY);
  BeerBoosterArray.push(newBeerBooster);
}

//FUNCIONES DETECT LEAVE

function detectIfHippiesLeave() {
  if (hippiesArray.length === 0) {
    return; // no ejecutar la funcion si el array esta vacío
  }

  if (hippiesArray[0].x + hippiesArray[0].w >= gameBoxNode.offsetWidth) {
    hippiesArray[0].node.remove(); // 1.-sacar del DOM
    hippiesArray.shift(); // 2.- sacarlo de JS
  }
}
function detectIfCarEnemyLeave() {
  if (enemyCarArray.length === 0) {
    return; // no ejecutar la funcion si el array esta vacío
  }

  if (enemyCarArray[0].y + enemyCarArray[0].h >= gameBoxNode.offSetHeight) {
    enemyCarArray[0].node.remove(); // 1.-sacar del DOM
    enemyCarArray.shift(); // 2.- sacarlo de JS
  }
}

function detectIfMainstreamLeave() {
  if (mainstreamArray.length === 0) {
    return;
  }

  if (mainstreamArray[0].x + mainstreamArray[0].w <= 0) {
    mainstreamArray[0].node.remove(); // 1.-sacar del DOM
    mainstreamArray.shift(); // 2.- sacarlo de JS
  }
}

function detectIfBeerBoosterLeave() {
  if (BeerBoosterArray.length === 0) {
    return;
  }

  if (BeerBoosterArray[0].x + BeerBoosterArray[0].w <= 0) {
    BeerBoosterArray[0].node.remove(); // 1.-sacar del DOM
    BeerBoosterArray.shift(); // 2.- sacarlo de JS
  }
}

//FUNCIONES DETECT CRASH

function detectCarCrashEnemyCar() {
  if (isGoingEnding) {
    return; // para que no vuelva a checkear la colision. ver setTimeout interno
  }

  enemyCarArray.forEach((eachCarEnemy) => {
    if (
      mainCar.x < eachCarEnemy.x + eachCarEnemy.w &&
      mainCar.x + eachCarEnemy.w > eachCarEnemy.x &&
      mainCar.y < eachCarEnemy.y + eachCarEnemy.h &&
      mainCar.y + eachCarEnemy.h > eachCarEnemy.y
    ) {
      mainCar.node.src = "./img/explosion.png";
      crashCarAudio.play();
      isGoingEnding = true;
      setTimeout(() => {
        gameOver();
      }, 300);
    }
    // Collision detected!
  });
}
function detectCarCrashMainstream() {
  mainstreamArray.forEach((eachMainstream) => {
    if (eachMainstream.isScored) {
      return;
    }

    if (
      mainCar.x < eachMainstream.x + eachMainstream.w &&
      mainCar.x + eachMainstream.w > eachMainstream.x &&
      mainCar.y < eachMainstream.y + eachMainstream.h &&
      mainCar.y + eachMainstream.h > eachMainstream.y
    ) {
      eachMainstream.node.src = "./img/sangre.png";
      atropelloAudio.play();
      eachMainstream.isScored = true;
      score += 50;
      scoreNode.innerText = `Score: ${score}`;

      setTimeout(() => {
        eachMainstream.node.style.display = "none";
      }, 300);
    }
  });
}
function detectCarCrashHippies() {
  hippiesArray.forEach((eachHippie) => {
    if (eachHippie.isScored) {
      return;
    }

    if (
      mainCar.x < eachHippie.x + eachHippie.w &&
      mainCar.x + eachHippie.w > eachHippie.x &&
      mainCar.y < eachHippie.y + eachHippie.h &&
      mainCar.y + eachHippie.h > eachHippie.y
    ) {
      eachHippie.node.src = "./img/sangre.png";
      atropelloAudio.play();
      eachHippie.isScored = true;
      score += 75;
      scoreNode.innerText = `Score: ${score}`;
      setTimeout(() => {
        eachHippie.node.style.display = "none";
      }, 300);
    }
  });
}
function detectCarCrashBeer() {
  BeerBoosterArray.forEach((eachBeer) => {
    if (eachBeer.IsWorking) {
      return;
    }

    if (
      mainCar.x < eachBeer.x + eachBeer.w &&
      mainCar.x + eachBeer.w > eachBeer.x &&
      mainCar.y < eachBeer.y + eachBeer.h &&
      mainCar.y + eachBeer.h > eachBeer.y
    ) {
      eachBeer.IsWorking = true;
      eachBeer.node.style.display = "none";
      mainCar.driverBoozer();
      audioGame.volume = 0.02;
      beerAudio.play();

      setTimeout(() => {
        beerAudio.pause();
        beerAudio.currentTime = 0;
        audioGame.volume = 0.1;
      }, 6000);
    }
  });
}

function detectCarCrashWalls() {
  if (isGoingEnding) {
    return; // para que no vuelva a checkear la colision. ver setTimeout interno
  }

  if (mainCar.x >= gameBoxNode.offsetWidth - mainCar.w) {
    mainCar.node.src = "./img/explosion.png";
    crashCarAudio.play();
    isGoingEnding = true;
    setTimeout(() => {
      gameOver();
    }, 200);
  }
  if (mainCar.y >= gameBoxNode.offsetHeight - mainCar.h) {
    mainCar.node.src = "./img/explosion.png";
    crashCarAudio.play();
    isGoingEnding = true;
    setTimeout(() => {
      gameOver();
    }, 200);
  }

  if (mainCar.x <= 0) {
    mainCar.node.src = "./img/explosion.png";
    crashCarAudio.play();
    isGoingEnding = true;
    setTimeout(() => {
      gameOver();
    }, 200);
  }

  if (mainCar.y <= 0) {
    mainCar.node.src = "./img/explosion.png";
    crashCarAudio.play();
    isGoingEnding = true;
    setTimeout(() => {
      gameOver();
    }, 200);
  }
}
//GAME LOOP

function gameLoop() {
  enemyCarArray.forEach((eachEnemyCar) => {
    eachEnemyCar.automaticMovement();
  });
  mainstreamArray.forEach((eachMainstream) => {
    eachMainstream.automaticMovement();
  });
  hippiesArray.forEach((eachHippie) => {
    eachHippie.automaticMovement();
  });
  BeerBoosterArray.forEach((eachBeer) => {
    eachBeer.automaticMovement();
  });
  detectIfCarEnemyLeave();
  detectCarCrashEnemyCar();
  detectIfMainstreamLeave();
  detectCarCrashMainstream();
  detectIfHippiesLeave();
  detectCarCrashHippies();
  detectIfBeerBoosterLeave();
  mainCar.mainCarMovement();
  detectCarCrashBeer();
  detectCarCrashWalls();
}

//GAME OVER

function gameOver() {
  audioGame.pause();
  audioGame.currentTime = 0;
  gameOverAudio.play();
  clearInterval(gameIntervalId);
  clearInterval(enemyCarIntervalId);
  clearInterval(HippiesIntervalId);
  clearInterval(mainstreamIntervalId);

  gameBoxNode.innerHTML = "";

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
  finalScoreNode.innerText = `Conductor solo has conseguido ${score} puntos`;

  saveAndshowScores();
}

function restartGame() {
  gameBoxNode.innerHTML = "";
  scoreListNode.innerHTML = "";
  score = 0;
  gameOverScreenNode.style.display = "none";
  mainCar = null;
  gameIntervalId = null;
  enemyCarArray = [];
  enemyCarIntervalId = null;
  mainstreamArray = [];
  mainstreamIntervalId = null;
  hippiesArray = [];
  hippiesIntervalId = null;
  BeerBoosterArray = [];
  BeerBoosterIntervalId = null;
  scoreNode.innerText = `Your Score: ${score}`;
  gameOverAudio.pause();
  gameOverAudio.currentTime = 0;
  isGoingEnding = false;
  
  startGame();
}

//!EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);
restartBtnNode.addEventListener("click", restartGame);
window.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    mainCar.keys.left = true;
  } else if (event.key === "d") {
    mainCar.keys.right = true;
  } else if (event.key === "w") {
    mainCar.keys.up = true;
  } else if (event.key === "s") {
    mainCar.keys.down = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "a") {
    mainCar.keys.left = false;
  } else if (event.key === "d") {
    mainCar.keys.right = false;
  } else if (event.key === "w") {
    mainCar.keys.up = false;
  } else if (event.key === "s") {
    mainCar.keys.down = false;
  }
});

playAudioNode.addEventListener("click", () => {
  audioGame.play();
});

pauseAudioNode.addEventListener("click", () => {
  audioGame.pause();
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

//colisiones coche contra mainstreamers (aumenta score) CHECK!
//colisiones coche contra perroflautas (aumenta score) CHECK!
//colisiones coche contra coches (game-over) CHECK!

//colision coche contra los margenes (game over) CHECK!
