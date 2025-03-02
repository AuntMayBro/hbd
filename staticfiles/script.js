
// popUp Video
const popup = document.querySelector('#winPopUp');
let fuckYou = document.querySelector("#fuckYou");
fuckYou.addEventListener("click",(e)=>{
    popup.style.display="flex";
});
popup.addEventListener("click",(e)=>{
    if(e.target==popup) popup.style.display="none";
});



const mediaUrl = window.MEDIA_URL; 


// Array of heart image URLs
const heartImages = [
    '/media/h1.png',
    '/media/h2.png',
    '/media/h3.png',
    '/media/h4.png',
    '/media/h5.png',
];

// Array of heart image URLs
//const heartImages = [
//    'media/h1.png',
//    'media/h2.png',
//    'media/h3.png',
//    'media/h4.png',
//    'media/h5.png',
//];

function createHeart() {
    const heart = document.createElement('img');
    const randomIndex = Math.floor(Math.random() * heartImages.length);  // Random index for the heart image
    heart.src = heartImages[randomIndex];  // Use random heart image
    heart.classList.add('heart');
    heart.style.left = '50%';
    heart.style.bottom = '60%';
    heart.style.setProperty('--heart-offset', `${Math.random() * 40 - 20}px`);
    heart.style.width = `${Math.random() * 8 + 32}px`;  // Adjusted size range for heart image
    heart.style.height = `${Math.random() * 8 + 32}px`;  // Adjusted size range for heart image

    document.querySelector('.image-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}
setInterval(createHeart, 300);



//lovepopup
const lovepopup = document.querySelector('#lovepopup');
let loveYou = document.querySelector("#loveYou");
let suckYou = document.querySelector("#suckYou");
loveYou.addEventListener("click",(e)=>{
    lovepopup.style.display="flex";
    loveYou.style.display="none";
    suckYou.style.display="flex";
});
lovepopup.addEventListener("click",(e)=>{
    if(e.target==lovepopup) lovepopup.style.display="none";
    else lovepopup.style.display="none";
});



//firework
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight], false);

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 3;
        this.size = Math.random() * 2 + 1;
        const colorVal = Math.round(0xffffff * Math.random());
        [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
        this.shouldExplode = false;
    }
    update() {
        this.shouldExplode = this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
        this.sy += 0.01;
        [this.x, this.y] = [this.x + this.sx, this.y + this.sy];
    }
    draw() {
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, r, g, b) {
        [this.x, this.y, this.sx, this.sy, this.r, this.g, this.b] = [x, y, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, r, g, b];
        this.size = Math.random() * 2 + 1;
        this.life = 100;
    }
    update() {
        [this.x, this.y, this.life] = [this.x + this.sx, this.y + this.sy, this.life - 1];
    }
    draw() {
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const fireworks = [new Firework()];
const particles = [];

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Math.random() < 0.25 && fireworks.push(new Firework());  //Controlling the number of fireworks
    fireworks.forEach((firework, i) => {
        firework.update();
        firework.draw();
        if (firework.shouldExplode) {
            for (let j = 0; j < 50; j++) particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
            fireworks.splice(i, 1);
        }
    });
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

animate();