// Contents list for the main pages (About, Research, Archive), as on the project pages.
const nav = document.getElementById("xp-toc");
const heads = [...document.querySelectorAll(".xp-article h2[id]")];
if (nav && heads.length > 1) {
  nav.innerHTML = heads.map((h) => `<a href="#${h.id}">${h.textContent.trim()}</a>`).join("");
  const links = [...nav.querySelectorAll("a")];
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-20% 0px -70% 0px" });
  heads.forEach((h) => io.observe(h));
}
