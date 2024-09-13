class MainCar {
  constructor() {
    this.x = 300;
    this.y = 720;
    this.h = 70;
    this.w = 50;
    this.speed = 10;
    this.keys = {
      up: false,
      right: false,
      down: false,
      left: false,
    };

    this.boozespeed = 0.5;

    //COCHE EN EL DOM

    this.node = document.createElement("img");
    this.node.src = "./img/mainCar.png";
    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  mainCarMovement() {
    if (this.keys.up && this.y >= 0) {
      this.y -= this.speed;
      this.node.style.top = `${this.y}px`;
    } else if (this.keys.down && this.y <= gameBoxNode.offsetHeight - this.h) {
      this.y += this.speed;
      this.node.style.top = `${this.y}px`;
    } else if (this.keys.left && this.x >= 0) {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
    } else if (this.keys.right && this.x <= gameBoxNode.offsetWidth - this.w) {
      this.x += this.speed;
      this.node.style.left = `${this.x}px`;
    }
  }

  driverBoozer() {
    const driverBoozerIntervalId = setInterval(() => {
      this.x += this.boozespeed;
      this.node.style.left = `${this.x}px`;
    });

    setTimeout(() => {
      clearInterval(driverBoozerIntervalId);
    }, 15000);
  }
}
