// Search page. `store` (every page's title, text, topics and address) comes from lunr-store.js
// and `lunr` from lunr.min.js, both loaded before this file.
const input = document.getElementById("search-input");
const list = document.getElementById("search-results");
const count = document.getElementById("search-count");

const index = lunr(function () {
  this.field("title", { boost: 10 });
  this.field("tags", { boost: 5 });
  this.field("excerpt");
  this.ref("id");
  this.pipeline.remove(lunr.trimmer);
  store.forEach((page, id) => this.add({ id, title: page.title, tags: page.tags, excerpt: page.excerpt }));
});

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// The words around the first place a search term appears, or the start of the page.
function snippet(text, terms) {
  const lower = text.toLowerCase();
  const hits = terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0);
  const at = hits.length ? Math.min(...hits) : 0;
  const from = at > 80 ? text.indexOf(" ", at - 80) + 1 : 0;
  const cut = text.slice(from, from + 220);
  return (from > 0 ? "… " : "") + cut.slice(0, cut.lastIndexOf(" ")) + " …";
}

function search() {
  const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) { list.innerHTML = ""; count.textContent = ""; return; }
  const found = index.query((q) => {
    for (const term of terms) {
      q.term(term, { boost: 100 });
      q.term(term, { boost: 10, usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING });
      if (term.length > 3) q.term(term, { boost: 1, usePipeline: false, editDistance: 1 });
    }
  });
  count.textContent = found.length === 1 ? "1 page" : `${found.length} pages`;
  list.innerHTML = found.slice(0, 40).map(({ ref }) => {
    const page = store[ref];
    return `<li><a href="${page.url}">${escapeHtml(page.title)}</a><span class="xp-writeups-text">${escapeHtml(snippet(page.excerpt, terms))}</span></li>`;
  }).join("");
}

document.getElementById("search-form").addEventListener("submit", (e) => e.preventDefault());
input.addEventListener("input", search);
const asked = new URLSearchParams(location.search).get("q");
if (asked) { input.value = asked; search(); }
input.focus();
