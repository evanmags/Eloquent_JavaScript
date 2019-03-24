function every(array, test) {
  for(let e in array){
  	if(!test(array[e])){
    	return false
   	}
  }
  return true
}

function every(array, test) {
  return array.some(e => !test(e)) ? false : true;
}