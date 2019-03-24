const range = (one, two, step = 1) => {
  arr = []
  if (one < two) {
	  do{
      arr.push(one)
      one += Math.abs(step)
  	} while (one <= two)
  } else {
	  do{
      arr.push(one)
      one -= Math.abs(step)
  	} while (one >= two)
  }
  return arr
}

const sum = (nums) => {
  total = 0
  nums.forEach(num => {
    total += num
  })
  return total
}