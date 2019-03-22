// discriminant counting of charactors.
function countChar(string, char){
  let count = 0;
  for(let i = 0; i < string.length; i++){
    string[i] === char ? count++ : count;
  }
  return count
}

function countBs(string){
  return countChar(string, "B");
}

console.log(countBs("BBC"));
// output: 2

console.log(countChar("kakkerlak", "k"));
// output: 4