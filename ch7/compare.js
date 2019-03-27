function compareRobots(robot1, memory1, robot2, memory2) {
  // create a trial log inside of each robot
  robot1.trials = []
  robot2.trials = []

  // rebuild runRobot to push trial number into 
  // trials log, not display it on screen
  // the rest of the function remains untouched
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        robot.trials.push(turn)
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  
  // run robots through 100 trials
  // using the same state for both robots
  for(let i = 0; i < 100; i++){
  	let state = VillageState.random()
    runRobot(state, robot1, memory1)
   	runRobot(state, robot2, memory2)
  }
  
  // reduce trials to singel value,
  // divide by the total trials
  robo1avg = robot1.trials.reduce((a, b) => a + b) / 100;
  robo2avg = robot2.trials.reduce((a, b) => a + b) / 100;
  
  // display result.
  console.log(`robot1 average ${robo1avg}`);
  console.log(`robot2 average ${robo2avg}`);
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);