class Grid{
  constructor(cells){
    if (!cells){
      this.cells = [];
      for (let i = 0; i < 20; i++){
        let row = []
        for (let j = 0; j < 20; j++){
    row.push(Math.random() > .5 ? "live" : "dead")
        }
        this.cells.push(row)
      }
    }
    else this.cells = cells;
  }
  display(){
    let grid = document.querySelector("#grid")
    grid.innerHTML = ''
    for(let row of this.cells){
      for(let cell of row){
        let check = document.createElement("input")
        check.type = "checkbox"
    if(cell == "live") check.checked = true
        grid.appendChild(check)
      }
      grid.appendChild(document.createElement('br'));
    }
  }
  checkAdjcent(row, cell){
    let count = 0
    // check horizontal
    if(cell + 1 < 10 && this.cells[row][cell + 1] == 'live') count++
    if(cell - 1 >= 0 && this.cells[row][cell - 1] == 'live') count++
    // check vertical
    if(row + 1 < 10 && this.cells[row + 1][cell] == 'live') count++
    if(row - 1 >= 0 && this.cells[row - 1][cell] == 'live') count++
    // check diagonal up
    if(row + 1 < 10 && cell + 1 < 10 && this.cells[row + 1][cell + 1] == 'live') count++
    if(row + 1 < 10 && cell - 1 >= 0 && this.cells[row + 1][cell - 1] == 'live') count++
    // check diagonal down
    if(row - 1 >= 0 && cell + 1 < 10 && this.cells[row - 1][cell + 1] == 'live') count++
    if(row - 1 >= 0 && cell - 1 >= 0 && this.cells[row - 1][cell - 1] == 'live') count++
    return count
  }
  next(){
    let newGrid = [];
    for(let row in this.cells){
      let newRow = []
      for(let cell in this.cells[row]){
        let state = this.cells[row][cell] 
        let count = this.checkAdjcent(parseInt(row), parseInt(cell));
        if(state == 'dead'){
          newRow.push(count == 3 ? 'live' : 'dead')
        } else {
          newRow.push(count == 2 || count == 3 ? 'live' : 'dead')
        }
      }
      newGrid.push(newRow)
    }
    return new Grid(newGrid)
  }
}
  
function runSim(){
  let grid = new Grid();
  grid.display()
  
  document.querySelector('#next').addEventListener('click', e => {
  	grid = grid.next()
    grid.display()
  })
}
  
runSim()