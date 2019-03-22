function chessboard(size){
  for(let h = size; h > 0; h--){
    let str = '';
    if(h % 2 === 0) str += " ";
    for(let w = size; w > 0; w--){
      if(w % 2 === 0) str += " ";
      else str += "#";
    }
    console.log(str);
  }
};

chessboard(8);

// output: 
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #