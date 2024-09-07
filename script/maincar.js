class MainCar{
  constructor(){
  
    this.x = 300;
    this.y = 720;
    this.h = 70;
    this.w = 50;
    this.speed = 10;


    //COCHE EN EL DOM

this.node = document.createElement("img")
this.node.src ="./img/mainCar.png"
gameBoxNode.append(this.node)

this.node.style.width = `${this.w}px`
this.node.style.height = `${this.h}px`
this.node.style.position = "absolute" 
this.node.style.top = `${this.y}px`
this.node.style.left = `${this.x}px`

}
//FUNCION CREADA PERO EL COCHE NO SE MUEVE
mainCarMovent(direction) {
if (direction === "right") {
  this.x += this.speed;
  this.node.style.left = `${this.x}px`;
} else if (direction === "left") {
  this.x -= this.speed;
  this.node.style.left = `${this.x}px`;
}else if (direction === "up") {
  this.y -= this.speed;
  this.node.style.top = `${this.y}px`

}else if (direction === "down") {
  this.y += this.speed;
  this.node.style.top = `${this.y}px`

}
}
}