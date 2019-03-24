function deepEqual(obj1, obj2){
  obj1len = Object.keys(obj1).length
  obj2len = Object.keys(obj2).length

  if (obj1len !== obj2len) return false

  for(key in obj1){
    if(obj1[key] !== obj2[key] || !obj2[key]){
        if(obj2[key] && typeof obj2[key] === 'object'){
          return deepEqual(obj1[key], obj2[key])
        }
        return false
      }
  }
  return true
}