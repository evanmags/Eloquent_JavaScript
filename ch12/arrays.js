// create an array
topScope.array = (...values) => [...values]; 

// return length
topScope.length = (array) => array.length;

// grab the nth item in an array
topScope.element = (array, n) => array[n];