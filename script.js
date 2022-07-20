const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let particleArray = [];

// NOTES: i declared the global variables needed

const mouse = {
  x: null,
  y: null,
  radius: 150,
};

// NOTES: this will store the mouse coordinates, and the radius of the area affected

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// NOTES: mouse move eventlistener will always update the mouse coordinates

context.fillStyle = 'blue';
context.font = '100px San-Serif';
context.fillText('David', 50, 200);
const data = context.getImageData(0, 0, 100, 100);

// NOTES: this is the the text I want to render.

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      this.size = 30;
    } else {
      this.size = 3;
    }
  }
}

// NOTES: class Particle will be the blueprint to create each particle on the canvas.

function initialise() {
  particleArray = [];
  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}

initialise();

// NOTES: initialise() will create x amount of particles in random places and push them in to particleArray - it needs to be called one to render

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}

animate();

// NOTES: animate() - is a loop which takes each particle in the array and draws them, becuase it is in a   requestAnimationFrame(animate) - it will keep re-drawing it again and again.
