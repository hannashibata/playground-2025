// console.log("I am linked");

// TOGGLE MENU
const toggleMenu = document.querySelector('.toggle-menu');
const toggleMenuButton = document.querySelector('.site-menu-button');

toggleMenuButton.onclick = function() {
  
  if (toggleMenu.getAttribute('data-menustate') === 'closed') {
    
    // if closesd, open
    toggleMenu.setAttribute('data-menustate','open');
  
  } else {
    
    // else, close it
    toggleMenu.setAttribute('data-menustate','closed');
    
  } 
  
};

// CLOSE THE TOGGLE MENU WHENEVER A USESR CLICKS ON A MENU LINK
const toggleMenuLinks = document.querySelectorAll('.toggle-menu a');
toggleMenuLinks.forEach((el) => {
  el.onclick = () => {
    toggleMenu.setAttribute('data-menustate','closed');
  }
});


// ON SCROLL ANIMATION, INTERSECTION OBSERVER
// Change active state for all elements with class="observe-me"
const myobserver = new IntersectionObserver((entries) => {

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

const mytargets = document.querySelectorAll('.observe-me');
mytargets.forEach((el) => {
  
    // sobserve every target
  myobserver.observe(el);
  
});

// AFTER 3 SECONDS SET DATA ATTRIBUTE SAYS THAT PAGE IS LOADED 
// This is for pages with page transition animation.

// const myTimeout = setTimeout(setPageLoaded, 5000);

// function setPageLoaded() {
//   document.body.setAttribute('data-page-loaded', 'page-loaded');
// }



// PARALLAX JS from David Efhan
function parallax({ el, ease = "linear" }) {
  
  let scrolling = false;

  function runParallax() {
    const pageTop = window.pageYOffset;
    const pageMid = pageTop + window.innerHeight / 2;
    const topSection = el.offsetTop;
    const midSection = topSection + el.offsetHeight / 2;
    const viewDistanceLeft = pageMid - midSection;
    const parallaxSpeed = parseFloat(el.getAttribute("data-parallax-speed"));

    // Set the parallax movement
    el.style.transform = `translate3d(0, ${ (viewDistanceLeft * parallaxSpeed) / 3 }px, 0)`;
    el.style.transition = `transform ${ease}`;
  }

  window.addEventListener("scroll", () => {
    if (!scrolling) {
      window.requestAnimationFrame(() => {
        runParallax();
        scrolling = false;
      });
    }
    scrolling = true;
  });
  
  runParallax();
  
}

// Parallax
const parallaxElements = document.querySelectorAll(".parallax-onscroll");
parallaxElements.forEach((el) => parallax({ el }));