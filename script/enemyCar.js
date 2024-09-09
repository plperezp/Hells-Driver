class EnemyCar {

  constructor(PositionX){

    this.x = PositionX;
    this.y = 0;
    this.h = 70;
    this.w = 50;
    this.speed = 4

this.node = document.createElement("img")
this.node.src = "./img/coche-enemigo.png"
gameBoxNode.append(this.node)

this.node.style.width = `${this.w}px`
this.node.style.height = `${this.h}px`
this.node.style.position = "absolute"
this.node.style.top = `${this.y}px`
this.node.style.left = `${this.x}px`

  }




  
automaticMovement(){
 this.y += this.speed
  this.node.style.top = `${this.y}px`
}

 







}

 