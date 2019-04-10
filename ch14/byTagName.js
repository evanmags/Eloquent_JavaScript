function byTagName(node, tagName) {
  return Array.from(node.querySelectorAll(tagName));
}