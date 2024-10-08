const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.width = 100;

  // Set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // Add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction: 'right', // Add direction property
    mouthOpen: true, // Add mouthOpen property for animation
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';

    // Update image based on direction and mouth state
    updatePacManImage(item);

    // Toggle mouth state every 5 updates (adjust as needed)
    if (Math.random() < 0.2) {
      item.mouthOpen = !item.mouthOpen;
    }
  });
  setTimeout(update, 20);
}

function updatePacManImage(item) {
  let imageNumber;
  if (item.direction === 'right') {
    imageNumber = item.mouthOpen ? 1 : 2;
  } else {
    imageNumber = item.mouthOpen ? 3 : 4;
  }
  item.newimg.src = `./images/PacMan${imageNumber}.png`;
}

function checkCollisions(item) {
  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight;

  if (item.position.x + item.newimg.width >= gameWidth || item.position.x <= 0) {
    item.velocity.x = -item.velocity.x;
    item.direction = item.velocity.x > 0 ? 'right' : 'left'; // Update direction
  }
  if (item.position.y + item.newimg.height >= gameHeight || item.position.y <= 0) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}