# *HELL'S DRIVER*

## [Play the Game!](https://plperezp.github.io/Hells-Driver/)

![Game Logo](./img/game-logo2.png)

# Description

*"Hell's Driver: The Definitive Driving Game"*

Get behind the wheel and unleash chaos on the streets! In *Hell's Driver*, running over is not only allowed... it's your mission! Face a world without rules, where pedestrians are points, enemy cars are obstacles, and the path to victory is through destruction. Do you dare to test your reflexes and your morals?

Drive like a maniac: Take control of your vehicle and race through the city infested with unsuspecting pedestrians. The more you run over, the more points you earn!
Drunk mode: Do you think you are brave? Take a drink and watch your ability distort. Drunk driving isn't easy, but the points are worth the risk.

No rules, just chaos: There are no limits. Crashing into pedestrians is part of the game. The only rule is to cause maximum chaos without losing your life.
Get ready for endless adrenaline! In *Hell's Driver*, the road is your battlefield. Smash, destroy and laugh while you do it!

# Main Functionalities

**Screen Transitions:**

- Switch between the splash screen, game screen, and game over screen.
- Start Game (startGame) and Restart Game (restartGame):

- Initialize all game elements like the main car, enemies, obstacles, and score.
- Reset the game entirely after losing, restoring variables and visual elements.

**Main Car Movement:**

- Control the main car using the W, A, S, D keys to move in four directions.
- Enemy and Obstacle Generation:

- Automatically and periodically generate enemy cars, humans (mainstreamers and hippies), and beer boosters.

**Collision Detection:**

- Detect collisions between the main car and enemies, obstacles, walls, or boosters, and handle the effects (game over, score increase, or boosters).

**Game Loop:**

- Continuously update the game state, including movements, collision detection, and removing off-screen elements.

**Score System:**

- Track the player's score during the game, display it in real-time, and save top scores to localStorage.

**Sound Effects:**

- Play different sounds for game actions like car crashes, human collisions, collecting boosters, and the game over event.

**Game Over Sequence:**

- Handle the game over condition when the car crashes, stop the game loop, show the final score, and transition to the game over screen.

**Music Controls:**

- Buttons to play and pause the background game music.


# Backlog Functionalities


- points multiplier during drunk mode
- Temporary weapon booster for the mainCar
- Changed controls functionality during drunk mode
- New game screens with different backgrounds
- Mobile implementation

# Technologies used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Local Storage

# States

- Splash Screen
- Game Screen
- Game Over Screen

# Extra Links

### Sketch

[Link](https://excalidraw.com/#json=J9vUkmWRDE4YqYBlG_-yK,Lu4gkQcNhFvDRGhaqifkLw)

### Slides

[Link](https://docs.google.com/presentation/d/1Z_JsoSdH7qpyCBI7FmYOHoyHht4gv7oYJFplqn6tScw/edit?usp=drive_link)

### Deploy

[Link](https://plperezp.github.io/Hells-Driver/)

# Special Thanks
 
 - Thanks to Room-12 *“where the dreams come true”* because without them, this game doesn't have sense.