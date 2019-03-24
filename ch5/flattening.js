let arrays = [[1, 2, 3], [4, 5], [6]];
arrays.reduce(
  (newArr, subArr) => newArr.concat(subArr)
)