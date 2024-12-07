const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

// Center the clock
ctx.translate(radius, radius);

// Scale down for clarity
const scaledRadius = radius * 0.975;

function drawClock() {
  drawFace(ctx, scaledRadius);
  drawTime(ctx, scaledRadius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#ccc";
  ctx.fill();

  // Add clock border
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw clock center
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#000";
  ctx.fill();
}

function drawTime(ctx, radius) {
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Hour hand
  const hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  drawHand(ctx, hourAngle, radius * 0.5, 7);

  // Minute hand
  const minuteAngle = ((minute + second / 60) * Math.PI) / 30;
  drawHand(ctx, minuteAngle, radius * 0.75, 5);

  // Second hand
  const secondAngle = (second * Math.PI) / 30;
  drawHand(ctx, secondAngle, radius * 0.85, 2, "#f00");
}

function drawHand(ctx, angle, length, width, color = "#000") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(angle);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-angle);
}

async function render() {
  setInterval(drawClock, 1000);
  drawClock();

  await loadComponent("header-nav", "header");

  document.body.addEventListener("dblclick", (e) => {
    e.preventDefault();

    toggleFullScreen(document.body);
  });
}

render();
