// =============================
// JOC SIMPLU — TAP CA SĂ SARI
// =============================

// Obținem canvasul și contextul pentru desen
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// 🖼️ Imaginea de fundal
const backgroundImg = new Image();
backgroundImg.src = 'fundal.jpg'; // asigură-te că numele este exact ca fișierul

// Încarcă imaginea playerului
const playerImg = new Image();
playerImg.src = 'player.png';

// Setări pentru personaj
const player = {
  x: 50,
  y: 200,
  size: 20,
  vy: 0,          // viteza verticală
  gravity: 0.5,   // cât de repede cade
  jumpPower: -8   // cât de tare sare
};

// Obstacol compus: sus + jos
const obstacle = {
  x: canvas.width,
  width: 40,
  gap: 180,  // spațiul dintre obstacole (poți modifica)
  topHeight: 100, // înălțime inițială a obstacolului de sus
  speed: 2
};

let score = 0;
let highScore = 0;
let gameOver = false;

// Eveniment: click sau atingere pentru a sări
canvas.addEventListener('click', jump);
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

function jump() {
  if (gameOver) {
    restart();
  } else {
    player.vy = player.jumpPower;
  }
}

// Funcția de actualizare
function update() {
  if (gameOver) return;

  // aplicăm gravitația
  player.vy += player.gravity;
  player.y += player.vy;

  // nu lăsăm jucătorul să iasă din ecran
  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
    player.vy = 0;
    gameOver = true;
  if (score > highScore) {
  highScore = score;
   } 
  }
  if (player.y < 0) {
    player.y = 0;
    player.vy = 0;
  }

  // mutăm obstacolul spre stânga
obstacle.x -= obstacle.speed;

// dacă iese din ecran → îl resetăm cu înălțime nouă aleatorie
if (obstacle.x + obstacle.width < 0) {
  obstacle.x = canvas.width;
  obstacle.topHeight = Math.random() * (canvas.height - obstacle.gap);
  score++;

  //  Creștem viteza după fiecare 10 puncte
  if (score > 0 && score % 10 === 0) {
    obstacle.speed += 0.5;  // poți schimba 0.5 în 0.2 sau 1, în funcție de cât de greu vrei
  }
}

// verificăm coliziunea cu obstacolul de sus
if (
  player.x < obstacle.x + obstacle.width &&
  player.x + player.size > obstacle.x &&
  player.y < obstacle.topHeight
) {
  gameOver = true;
}

// verificăm coliziunea cu obstacolul de jos
if (
  player.x < obstacle.x + obstacle.width &&
  player.x + player.size > obstacle.x &&
  player.y + player.size > obstacle.topHeight + obstacle.gap
) {
  gameOver = true;
}
}

// Funcția de desenare
function draw() {
  // 🧹 Curățăm canvasul
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🖼️ Desenăm imaginea de fundal pe tot ecranul
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // 🟦 Desenăm jucătorul
  ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);

  // 🟥 Desenăm obstacolul de sus
  ctx.fillStyle = 'red';
  ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.topHeight);

  // 🟥 Desenăm obstacolul de jos
  ctx.fillRect(
    obstacle.x,
    obstacle.topHeight + obstacle.gap,
    obstacle.width,
    canvas.height - obstacle.topHeight - obstacle.gap
  );

// desenăm obstacolul de jos
ctx.fillRect(
  obstacle.x,
  obstacle.topHeight + obstacle.gap,
  obstacle.width,
  canvas.height - (obstacle.topHeight + obstacle.gap)
);

  //  Desenăm scorul
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Scor: ${score}`, 10, 30);

  //  Desenăm high score-ul
  ctx.fillText(`Record: ${highScore}`, 10, 60);
  }

  // mesaj game over
    if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 70, canvas.height / 2);
    ctx.font = '16px Arial';
    ctx.fillText('Click sau Space pentru a reîncepe', canvas.width / 2 - 120, canvas.height / 2 + 30);
  }

// Funcția principală — buclă joc
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function restart() {
  player.y = 200;
  player.vy = 0;
  obstacle.x = canvas.width;

  // ✅ Resetează doar scorul actual, nu și recordul
  score = 0;
  
  gameOver = false;
}

// Pornim jocul
loop();

// Obstacol compus: sus + jos
const obstacleTopButtom = {
  x: canvas.width,
  width: 40,
  gap: 180,  // spațiul dintre obstacole (poți modifica)
  topHeight: 100, // înălțime inițială a obstacolului de sus
  speed: 2
};

// mutăm obstacolul spre stânga
obstacle.x -= obstacle.speed;

// dacă iese din ecran → îl resetăm cu înălțime nouă aleatorie
if (obstacle.x + obstacle.width < 0) {
  obstacle.x = canvas.width;
  obstacle.topHeight = Math.random() * (canvas.height - obstacle.gap - 50) + 20; // înălțime aleatoare pentru partea de sus
  score++;
}

// verificăm coliziunea cu obstacolul de sus
if (
  player.x < obstacle.x + obstacle.width &&
  player.x + player.size > obstacle.x &&
  player.y < obstacle.topHeight
) {
  gameOver = true;
}

// verificăm coliziunea cu obstacolul de jos
if (
  player.x < obstacle.x + obstacle.width &&
  player.x + player.size > obstacle.x &&
  player.y + player.size > obstacle.topHeight + obstacle.gap
) {
  gameOver = true;
}