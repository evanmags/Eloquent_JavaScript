class Monster {
  constructor(pos, speed, reset) {
    this.pos = pos,
    this.speed = speed
  }

  get type() { return "monster"; }

  static create(pos) {
    return new Monster(pos.plus(new Vec(0, -1)), new Vec(-4, 0));
  }

  update(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Monster(newPos, this.speed);
    } else {
      return new Monster(this.pos, this.speed.times(-1));
    }
  }

  collide(state) {
    let player = state.player;
    if(Math.floor(player.pos.plus(player.size).y) === this.pos.y){
      let filtered = state.actors.filter(x => x != this);
        return new State(state.level, filtered, state.status);
    }
    else{
      return new State(state.level, state.actors, "lost");   
    }
  }
}