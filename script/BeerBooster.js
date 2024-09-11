class BeerBooster {

  constructor(positionY){
    this.x = gameBoxNode.offsetWidth;
    this.y = positionY;
    this.h = 50;
    this.w = 50;
    this.speed = 2


    this.node =document.createElement("img")
    this.node.src = "./img/BeerBooster.png"

    gameBoxNode.append(this.node)

    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    this.node.style.position = "absolute" 
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
  }
  
  automaticMovement() {

    this.x -= this.speed
    this.node.style.left = `${this.x}px`
}
}