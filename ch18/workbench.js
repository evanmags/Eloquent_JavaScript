const code = document.querySelector("#code");
const button = document.querySelector("#button");
const output = document.querySelector("#output");

function runCode(e){
  e.preventDefault()
  let func;
  try{
  func = new Function(code.value)
  } catch (Error) {
    console.log(Error)
  }
  
  try{
  output.textContent = func();
  } catch (Error) {
    console.log(Error)
  }
  output.textContent = func();
}

button.addEventListener('click', runCode);