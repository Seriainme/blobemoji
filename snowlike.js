const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createParticles(x, y) {
  for(let i = 0; i < 50; i++) {
    let angle = Math.random() * Math.PI * 2;
    let radius = Math.random() * 100 + 20; // range of 20 to 120 pixels from center
    let particleX = x + Math.cos(angle) * radius;
    let particleY = y + Math.sin(angle) * radius;
    particles.push(new Particle(particleX, particleY));
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = Math.random() * 3 + 1;
  this.color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
  this.vx = Math.random() * 2 - 1;
  this.vy = Math.random() * 2 - 1;
  this.gravity = 0.1;
  this.alpha = 1;
  this.decay = 0.01;
}

Particle.prototype.update = function() {
  this.vx *= 0.99;
  this.vy *= 0.99;
  this.vy += this.gravity;
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= this.decay;
  if(this.alpha <= this.decay) {
    this.alpha = 0;
  }
}

Particle.prototype.draw = function() {
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  particles.forEach((p, i) => {
    if(p.alpha === 0) {
      particles.splice(i, 1);
    }
  });
  requestAnimationFrame(loop);
}

canvas.addEventListener('click', e => {
  createParticles(e.clientX, e.clientY);
});

loop();
