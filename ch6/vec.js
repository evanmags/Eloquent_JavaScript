// vector class
class Vec {
	constructor(x, y){
    	this.x = x
      	this.y = y
    }
  	plus({x, y}){
		return new Vec(this.x + x, this.y + y)
    }
  	minus({x, y}){
    	return new Vec(this.x - x, this.y - y)
    }
  	get length(){
      	let a = this.x * this.x;
      	let b = this.y * this.y;
    	return Math.sqrt(a + b)
    }
}