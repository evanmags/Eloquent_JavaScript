async function runGame(plans, Display) {
  let lives = 3;
  for (let level = 0; level < plans.length;) {
    if (lives == 0) break;
    console.log(`You have ${lives} lives remaining`)
    let status = await runLevel(new Level(plans[level]),
                                Display);
    if (status == "won") level++;
    if (status == "lost") {
      lives--;
    }
  }
  if (lives == 0) console.log("You've lost!");
  else console.log("You've won!");
}
runGame(GAME_LEVELS, DOMDisplay);