class GroupIterator{
	constructor(Group){
   		this.index = -1;
    	this.group = Group;
    }
  	next(){
      if(!this.done()){
        let value = this.group.contents[this.index]
    	return {value, done: false}
      } else {
        return {done: true};
      }
    }
  	done(){
     	 this.index++
    	if(this.index < this.group.contents.length){
        	return false;
        } else {
          this.index = -1;
          return true;
        }
    }
}

Group.prototype[Symbol.iterator] = function(){
	return new GroupIterator(this);
}