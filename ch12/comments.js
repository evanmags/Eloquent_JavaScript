function skipSpace(string) {
  let matches = string.match(/^(\s|#.*)*/g);
  return string.slice(matches[0].length)
}