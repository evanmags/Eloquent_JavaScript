class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  let result = null;
  try {
    result = primitiveMultiply(a, b);
  } catch(e) {
  	if(e instanceof MultiplicatorUnitFailure){
    	return reliableMultiply(a, b)
    }
    throw e
  } 
  return result;
}

function reliableMultiply(a, b) {
  let result = null;
  for(;;){
    try {
      result = primitiveMultiply(a, b);
    } catch(e) {
      if(!(e instanceof MultiplicatorUnitFailure)){
      	throw e
      }
    }
    if(result){
    	break
    }
  }
  return result;
}