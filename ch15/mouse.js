const trail = [];
let count = 0;
function create_trail_ele(e){
  const t = document.createElement('div');
  t.classList.add('trail');
  t.style.top = e.clientY + 'px';
  t.style.left = e.clientX + 'px';
  document.body.appendChild(t);
  trail.push(t);
}
window.addEventListener('mousemove',(e)=>{
  if(trail.length < 10) create_trail_ele(e);
  else {
    let t = trail[count % trail.length]
      t.style.top = e.clientY + 'px';
      t.style.left = e.clientX + 'px';
      count++;
  }
})

