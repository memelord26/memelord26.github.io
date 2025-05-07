let items = document.querySelectorAll('.slider .item');
let active = 3;

//navbar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


//projects slider
function loadShow(){
    // Loop through and reset all items first
    for (let i = 0; i < items.length; i++) {
        items[i].style.transform = 'scale(0)';
        items[i].style.opacity = 0;
    }

    // Center (active) card
    let len = items.length;
    for (let offset = -2; offset <= 2; offset++) {
        let index = (active + offset + len) % len;
        let item = items[index];
        let zIndex = -Math.abs(offset);
        let scale = 1 - 0.2 * Math.abs(offset);
        let translateX = 120 * offset;
        let rotateY = offset < 0 ? 1 : offset > 0 ? -1 : 0;
        let blur = Math.abs(offset) === 0 ? 'none' : 'blur(5px)';
        let opacity = Math.abs(offset) > 2 ? 0 : Math.abs(offset) === 0 ? 1 : 0.6;

        item.style.transform = `translateX(${translateX}px) scale(${scale}) perspective(16px) rotateY(${rotateY}deg)`;
        item.style.zIndex = zIndex;
        item.style.filter = blur;
        item.style.opacity = opacity;
    }
}
loadShow();
let next = document.getElementById('next');
let prev = document.getElementById('prev');
next.onclick = function(){
    active = (active + 1) % items.length;
    loadShow();
}
prev.onclick = function(){
    active = (active - 1 + items.length) % items.length;
    loadShow();
}
// Auto-scroll every 3 seconds
let interval = setInterval(() => {
    active = (active + 1) % items.length;
    loadShow();
}, 5000);

document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(interval);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    interval = setInterval(() => {
        active = (active + 1) % items.length;
        loadShow();
    }, 3000);
});
