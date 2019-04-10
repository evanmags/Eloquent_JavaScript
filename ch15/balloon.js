const balloon = document.querySelector('p');
function resize(e){
  e.preventDefault();
  e.stopPropagation();
  const size = parseInt(window.getComputedStyle(balloon).fontSize);
  if(size > 50){
    balloon.textContent = '💥';
      window.removeEventListener("keydown", resize);
  } else {
    if (size > 10){
      if(e.key == "ArrowUp") balloon.style.fontSize = `${size * 1.10}px`;
      if(e.key == "ArrowDown") balloon.style.fontSize = `${size * .90}px`;
    } else {
      if(e.key == "ArrowUp") balloon.style.fontSize = `${size + 1}px`;
      if(e.key == "ArrowDown") balloon.style.fontSize = `${size - 1}px`;
    }  
  }
}
window.addEventListener("keydown", resize);