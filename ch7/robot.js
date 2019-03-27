const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
]

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
]

function buildGraph(edges){
  // create empty object
  let graph = Object.create(null)
  // define function to generate graph
  function addEdge(from, to){
    // make sure property exists in graph
    if(graph[from] == null){
      // if not add it and set equal to a 
      // new array with to in it.
      graph[from] = [to]
    } else {
      // if it does, push to into array
      graph[from].push(to)
    }
  }
  // create new array with sub items [from, to]
  // by splitting the items in the original array
  // at their hyphens
  for (let [from, to] of edges.map(r => r.split('-'))) {
    // add bi-directionally to the graph
    addEdge(from, to)
    addEdge(to, from)
  }
  // return graph to correct scope
  return graph
}

const roadGraph = buildGraph(roads)

class VillageState {
  constructor(place, parcels){
    this. place = place // the location of the robot
    this.parcels = parcels // an array of undelivered parcels
  }
  // method to move the robot in the village
  move(destination){
    // make sure that this location has a road to the destination
    if(!roadGraph[this.place].includes(destination)){
      return this
      // leave state of village unchanged
    } else {
      let parcels = this.parcels.map(p => {
        // if the parcel is not in the same location as the robot
        // do nothing with it.
        if(p.place != this.place) return p;
        // update all parcels that are with the robot to the new location
        return {place: destination, address: p.address}
        // remove all parcels that have now reached their destination
      }).filter(p => p.place != p.address)
      // create and return a new state buildt from the
      // destination and new parcels
      return new VillageState(destination, parcels);
    }
  }
}

// put a robot through a simulation with a specific village
function runRobot(state, robot, memory){
  // loop until done
  for(let turn = 0;; turn++){
    // make sure that there are actually parcels to be delivered
    if(state.parcels.length == 0){
      console.log(`Done in ${turn} turns`)
      break
    }
    // if so:
    // call robot to action (choose move)
    let action = robot(state, memory)
    // get new state ie pick up and deliver packages
    // from or at the new destination
    state = state.move(action.direction)
    memory = action.memory
    console.log(`Moved to ${action.direction}`)
  }
}

function randomPick(array){
  // choose an integet from 0 to arral length
  let choice = Math.floor(Math.random() * array.length)
  // return the item at that index in the array
  return array[choice]
}

function randomRobot(state){
  // choose a random destination from
  // the array in the roadGraph that corresponds to
  // the current location of the robot
  // this is the "action" in the runRobot() method
  return {direction: randomPick(roadGraph[state.place])}
}

function routeRobot(state, memory){
  if(memory.length === 0){
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// create a random environment for the robot to run in
VillageState.random = function(parcelCount = 5){
  // create an empty array
  let parcels = []
  // loop pushing in a new parcel up to the count
  for (let i = 0; i < parcelCount; i++){
    // use the same random pick function as before
    // to pick a random place in the graph do deliver the package
    let address = randomPick(Object.keys(roadGraph))
    let place;
    do{
      // pick a random starting location for each parcel
      // looping to make sure that it is different than the start
      place = randomPick(Object.keys(roadGraph))
    } while (place == address)
    parcels.push({place, address})
  }
  // create a village state using the new list of parcels
  return new VillageState("Post Office", parcels)
}

function findRoute(graph, from, to){
  // define an array of locations to be explored.
  let work = [{at: from, route: []}];
  // loop through that array 
  for(let i = 0; i < work.length; i++){
    // get the selectors from the items in the array
    let {at, route} = work[i];
    // loop through associated destinations from the place (at)
    // this is a physical location,
    // route is the steps to get there.
    for (let place of graph[at]){
      // if it is where you want to go, go to it.
      if(place == to) return route.concat(place);
      // else, as long as it is not already in the list search, 
      // add it to the search list
      if(!work.some(w=> w.at == place)){
        work.push({at: place, route: route.concat(place)})
      }
    }
  }
}

function yourRobot(state, memory){
  // create two holding values, one for the 
  // newly created route and one as the benchmark
  let shortest = null, route;
  // run only if there is no memory left
  if(memory.length == 0){
    // loop through all parcels
    state.parcels.forEach(p=>{
      // if the parcel is not yet picked up
      // find the shortest route to that location 
      if(p.place != state.place){
        route = findRoute(roadGraph, state.place, p.place);
      } else {
        // otherwise it is with us
        // find the route to its dropof
        route = findRoute(roadGraph, state.place, p.address);
      }
      
      // if no shortest yet, route is now the shortest
      if (shortest == null){
        shortest = route
      } else if (route.length < shortest.length) {
        // otherwise only replace benchmark for shorter lists
        shortest = route
      }
      
    })
    memory = shortest;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

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

compareRobots(routeRobot, [], goalOrientedRobot, []);

runRobot(VillageState.random(), yourRobot, []);