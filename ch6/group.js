// create a group class
class Group {
  constructor(values){
  	this.contents = values.filter((e, i, a)=> i == values.indexOf(e))
  }
  static from(itterable){
    return new Group(itterable)
  } 
  add(value){
  	if(!this.has(value)) this.contents.push(value);
  }
  delete(value){
    if(this.has(value)) this.contents.splice(this.contents.indexOf(value), 1)
  }
  has(value){
  	return this.contents.includes(value) ? true : false;
  }
}