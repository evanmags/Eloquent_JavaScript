function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let paused = false;
  
  return new Promise(resolve => {
    function pauseGame(e){
      if (e.key === "Escape"){
        e.preventDefault();
        paused = !paused;
        if (!paused) return runAnimation(frame);
      }
    }

    window.addEventListener("keydown", pauseGame)
    
    const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
    
    function frame (time){
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (paused){
        return false;
      }
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        window.removeEventListener("keydown", pauseGame);
        arrowKeys.remove();
        return false;
      }
    };
    runAnimation(frame);
  });
}

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  down.remove = () => {
    window.removeEventListener("keyup", track);
      window.removeEventListener("keydown", track);
  }
  return down;
}
runGame(GAME_LEVELS, DOMDisplay);