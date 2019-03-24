function arrayToList(arr){
  let list = null
  for (let i = arr.length; i >= 0; i--) {
    list = {
      value: arr[i],
      rest: list
    }
  }
  return list;
}


function listToArray(list){
  let arr = []
  do{
    arr.push(list.value)
    list = list.rest
  } while (list)
  return arr
 }
 
function prepend(val, list){
  return {
    value: val,
    rest: list
  }
}

function nth(list, lvl){
  while(lvl > 0) {
    list = list.rest
    lvl--
  }  
  if (lvl === 0){
    return list.value
  }
  return undefined
}

// or

function nth(list, lvl){
  if(lvl > 0) {
    return nth(list.rest, lvl--)
  }
  else if (lvl === 0){
    return list.value
  }
  return undefined
}