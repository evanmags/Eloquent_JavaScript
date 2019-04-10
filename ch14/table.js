MOUNTAINS.forEach((e, i)=>{
  if (i === 0) {
    const row = document.createElement('tr');
    for(let d in e){
        const cell = document.createElement('th');
        cell.appendChild(document.createTextNode(d));
        row.appendChild(cell);
    }
    table.appendChild(row);
  }
  const row = document.createElement('tr');
  for(let d in e){
    const cell = document.createElement('td');
    cell.appendChild(document.createTextNode(e[d]));
    if (d == "height") cell.style.textAlign = "right";
    row.appendChild(cell);
  }
  table.appendChild(row);
})