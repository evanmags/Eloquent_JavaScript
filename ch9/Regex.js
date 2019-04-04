// Exercise 1
// car and cat
  /ca[rt]/;
// pop and prop
  /pr?op/;
// ferret, ferry, and ferrari
  /ferr(et|y|ari)/;
// Any word ending in ious
  /ious\b/;
// A whitespace character followed by a period, comma, colon, or semicolon
  /\W[.,:;]/;
// A word longer than six letters
  /\w{7,}/;
// A word without the letter e (or E)
  /\b[^\We]+\b/i;


// Exercise 2  
//from this 'I'm the cook,' he said, 'it's my job.'
  /(^|\W)'|'(\W|$)/g; "$1\"$2";
// to this "I'm the cook," he said, "it's my job."


// Exercise 3
//