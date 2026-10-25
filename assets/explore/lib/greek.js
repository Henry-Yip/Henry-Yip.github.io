// The UI sans draws Greek nu like a Latin v. Outside typeset maths, set Greek letters in the serif face.
const GREEK = /([Ͱ-Ͽ])/;

export function serifGreek(root = document) {
  const scopes = root.querySelectorAll(".xp-hero, .xp-article h2, .xp-article h3, .xp-widget, .xp-article table, .xp-facts");
  for (const scope of scopes) {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (GREEK.test(n.nodeValue) && !n.parentElement.closest(".katex, .gr, svg, script") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const n of nodes) {
      const frag = document.createDocumentFragment();
      for (const part of n.nodeValue.split(GREEK)) {
        if (!part) continue;
        if (GREEK.test(part)) {
          const s = document.createElement("span");
          s.className = "gr";
          s.textContent = part;
          frag.appendChild(s);
        } else frag.appendChild(document.createTextNode(part));
      }
      n.replaceWith(frag);
    }
  }
}
