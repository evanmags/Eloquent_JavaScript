async function locateScalpel(nest) {
  // source is the current location to be searched
  // next is the new location to be searched
  let source, next = nest.name;
  do{
    // initialized backwards so that this loop works.
  	source = next;
    // anyStorage returns a promise
    // await result to determin next location to query
  	next = await anyStorage(nest, source, "scalpel");
    // is next is the same as source break loop and return next
  } while (next !== source)
  return next;
}

function locateScalpel2(nest) {
  // same as above but using .then()
  // must use recursive method since promise finished AFTER
  // we exit the function
  function loop(source){
  	return anyStorage(nest, source, "scalpel").then( name =>{
      	// same condition as above to break,
    	if (source === name) return name;
    	// otherwise recurse
      	else return loop(name)
    });
  } 
  // init loop
  return loop(nest.name);
}

