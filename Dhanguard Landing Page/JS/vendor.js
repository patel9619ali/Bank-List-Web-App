let scrollPos = window.scrollY;
const header = document.querySelector(".navbar");
const headerHeight = header.offsetHeight-3;

const addClassOnScroll = () => {
    header.classList.add("fixed-top");
    header.classList.remove("position-relative");
}
const removeClassOnScroll = () => {
    header.classList.remove("fixed-top");
    header.classList.add("position-relative");
}

window.addEventListener('scroll', function() { 
  scrollPos = window.scrollY;

  if (scrollPos >= headerHeight) { 
    addClassOnScroll() ;
}
  else { 
    removeClassOnScroll() 
}
})