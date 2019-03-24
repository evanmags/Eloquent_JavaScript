function reverseArray(arr){
  newArr = [];
 for(let i = arr.length - 1; i >= 0; i--){
 	newArr.push(arr[i])
 }
 return newArr
}

function reverseArrayInPlace(arr){
  let len = arr.length
  for(let f = 0, l = len - 1; f < Math.floor(len/2), l > Math.ceil(len/2); f++, l--){
  	let ph = arr[l]
    arr[l] = arr[f]
    arr[f] = ph
  }
}
