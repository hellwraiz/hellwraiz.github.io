
// Get references to the parent and child divs
const mainpage = document.getElementsByClassName('mainpage')[0];
const photo = document.getElementsByClassName('photo')[0];
const homeinfo = document.getElementsByClassName('homeinfo')[0];

const homeinfoh = "12vw";
const homeinfow = "48vw";
var animDone = true;
var temp = false;

function easeOutBounce(t, b, c, d) {
  t /= d;
  if (t < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    t -= (1.5 / 2.75);
    return c * (7.5625 * t * t + 0.75) + b;
  } else if (t < (2.5 / 2.75)) {
    t -= (2.25 / 2.75);
    return c * (7.5625 * t * t + 0.9375) + b;
  } else {
    t -= (2.625 / 2.75);
    return c * (7.5625 * t * t + 0.984375) + b;
  }
}

// Animate height using requestAnimationFrame
function animateHeight(element, start, end, duration) {
  let startTime = null;
  const change = end - start;

  function animate(time) {
    if (!startTime) startTime = time;
    let elapsed = time - startTime;
    if (elapsed > duration) elapsed = duration;
    // Calculate new height with the bounce easing function
    const newHeight = easeOutBounce(elapsed, start, change, duration);
    element.style.height = newHeight + "vw";

    // Continue the animation until the duration is reached
    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
        animDone = true;
    }
  }
  
  requestAnimationFrame(animate);
}



// Function to handle hover effects when hovering over div2
function handleHover() {
    if (animDone == false) {
        setTimeout(() => {
            handleLeave();
        }, 100);
        return;
    }
    animDone = false;
    homeinfo.style.width = homeinfow;
    mainpage.style.width = homeinfow;
    setTimeout(() => {
        animateHeight(homeinfo, 0, 12, 1000);
    }, 200);
}

// Function to handle hover effects when not hovering over div1
function handleLeave() {
    if (animDone == false) {
        setTimeout(() => {
            handleLeave();
        }, 100);
        return;
    }
    homeinfo.style.transition = 'height 300ms linear';
    homeinfo.style.height = 0;
    mainpage.style.height = homeinfoh;
    setTimeout(() => {
        homeinfo.style.transition = 'width 200ms linear';
        homeinfo.style.width = 0;
        mainpage.style.width = homeinfoh;
    }, 300);
}

// Event listeners
mainpage.addEventListener('mouseenter', handleHover); // When mouse enters div2
mainpage.addEventListener('mouseleave', handleLeave); // When mouse leaves div1

