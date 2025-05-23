//modified from (added offset to) orignal anchor-scroll by Benjamin De Cock (https://github.com/bendc)
//https://github.com/bendc/anchor-scroll

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = (() => {
    if ("scrollingElement" in document) return document.scrollingElement;
    const html = document.documentElement;
    const start = html.scrollTop;
    html.scrollTop = start + 1;
    const end = html.scrollTop;
    html.scrollTop = start;
    return end > start ? html : document.body;
  })();

  const ease = (duration, elapsed, start, end) =>
    Math.round(end * (-Math.pow(2, -10 * elapsed/duration) + 1) + start);

  const getCoordinates = hash => {
    const start = root.scrollTop;
    const delta = (() => {
      if (hash.length < 2) return -start;
      const target = document.querySelector(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      const max = root.scrollHeight - window.innerHeight;
      return start + top < max ? top : max - start;
    })();
    if (delta) return new Map([["start", start], ["delta", delta]]);
  };

  const scroll = link => {
    const hash = link.getAttribute("href");
    const coordinates = getCoordinates(hash);
    if (!coordinates) return;

    const tick = timestamp => {
      progress.set("elapsed", timestamp - start);
      root.scrollTop = ease(...progress.values(), ...coordinates.values());
      progress.get("elapsed") < progress.get("duration")
      ? requestAnimationFrame(tick)
      : complete(hash, coordinates);
    };

    const progress = new Map([["duration", 800]]);
    const start = performance.now();
    requestAnimationFrame(tick);
  };

  const complete = (hash, coordinates) => {
    history.pushState(null, null, hash);
    root.scrollTop = coordinates.get("start") + coordinates.get("delta");
  };

  const attachHandler = (links, index) => {
    const link = links.item(index);
    link.addEventListener("click", event => {
      event.preventDefault();
      scroll(link);
    });
    if (index) return attachHandler(links, index - 1);
  };

  const links = document.querySelectorAll("a.scroll");
  const last = links.length - 1;
  if (last < 0) return;
  attachHandler(links, last);
});


// ON SCROLL ANIMATION, INTERSECTION OBSERVER
// Change active state for all elements with class="observe-me"
const scrollobserver = new IntersectionObserver((entries) => {

  // look throught all entries
  entries.forEach((entry) => {
    
    // if each is in view, set it to active, else innactive
    if (entry.isIntersecting) {
      entry.target.setAttribute("data-viewstate", "active");
    } else {
      entry.target.setAttribute("data-viewstate", "inactive");
    };
    
  });

});

const scrolltargets = document.querySelectorAll('.observe-me');
scrolltargets.forEach((el) => {
  
    // sobserve every target
  scrollobserver.observe(el);
  
});