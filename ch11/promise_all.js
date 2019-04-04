function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    // create array to return
    let arr = []
    // create tally for counting finished promises
    let pending = promises.length;
    // init loop
    for (let i = 0; i < promises.length; i++){
      // set .then for all promises
    	promises[i].then(res => {
          	// push result of each promise into the array
        	arr[i] = res;  
          	// cound down tally
        	pending--;
          	// chech if tally is 0, if so 
           	// resolve all promises to the main promise.
          	if(pending === 0) resolve(arr);
          // handle error to main promise
        }).catch(reject)
    }
    // make sure initial array is now empty
    // (all promises processed and returned)
    // resolve main promise
    if(promises.length === 0) resolve(arr);
  });
}