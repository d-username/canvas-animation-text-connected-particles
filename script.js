const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let particleArray = [];
let adjustX = 10;
let adjustY = 10;

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
context.font = '30px Tahoma';
context.fillText('David', 0, 25);
const textCoordinates = context.getImageData(0, 0, 100, 100);

// NOTES: this is the the text I want to render.

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 5 + 1;
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
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else if (
      distance >= mouse.radius &&
      (this.x !== this.baseX || this.y !== this.baseY)
    ) {
      this.size = 3;
      let dx = this.x - this.baseX;
      this.x -= dx / 25;
      let dy = this.y - this.baseY;
      this.y -= dy / 25;
    }
  }
}

// NOTES: class Particle will be the blueprint to create each particle on the canvas.
// NOTES: update() - checking the distance between the mouse and the particles - adds conditional styling to them.
// NOTES: in the IFs, i tell the particles to move away from the mouse AND also move back to they base position when mouse is away.

function initialise() {
  particleArray = [];
  let textHeight = textCoordinates.height;
  let textWidth = textCoordinates.width;
  for (let y = 0; y < textHeight; y++) {
    for (let x = 0; x < textWidth; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x + adjustX;
        let positionY = y + adjustY;
        particleArray.push(new Particle(positionX * 10, positionY * 10));
      }
    }
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
  connect();
  requestAnimationFrame(animate);
}

animate();

// NOTES: animate() - is a loop which takes each particle in the array and draws them, becuase it is in a   requestAnimationFrame(animate) - it will keep re-drawing it again and again.

function connect() {
  for (let p = 0; p < particleArray.length; p++) {
    for (let e = p; e < particleArray.length; e++) {
      let dx = particleArray[p].x - particleArray[e].x;
      let dy = particleArray[p].y - particleArray[e].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) {
        context.strokeStyle = 'green';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(particleArray[p].x, particleArray[p].y);
        context.lineTo(particleArray[e].x, particleArray[e].y);
        context.stroke();
      }
    }
  }
}

// NOTES: connect() - this creates the "constellation effect - connects the partickles."
