class PGroup {
  constructor(contents){
    this.contents = contents
  }

  add(element){
    return new PGroup(this.contents.concat([element]));
  }

  delete(element){
    return new PGroup(this.contents.filter(e => e !== element));
  }
  has(element){
    return this.contents.some(e => e == element)
  }
}

PGroup.empty = new PGroup([])