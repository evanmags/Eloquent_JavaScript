function loop(value, test, update, body){
  for(value; test(value); value = update(value)){
    body(value);
  }
 }