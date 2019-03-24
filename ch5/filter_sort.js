// first two function are given

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

//{
//name: "Coptic",
//ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
//direction: "ltr",
//year: -200,
//  living: false,
//link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
//}

// original
function dominantDirection(text) {
  // turn text into an array
  let array = text
    .split("")
    // map each character to its data
    .map((char, i) => characterScript(text.codePointAt(i)))
    // filter out non values
    .filter(char => char);
  // count number of instances for each script direction
  return countBy(array, item => item.direction).sort((a, b) =>
    a.count < b.count ? 1 : -1
  )[0].name;
}

// more succinct
function dominantDirection(text) {
  return countBy(text, (char) => {
    let x = characterScript(char.codePointAt(0))
     return x ? x.direction : 'none'
  }).filter( y => y != 'none')
    .reduce((a,b) => a.count > b.count ? a : b).name
 }
 
