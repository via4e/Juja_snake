import './assets/style.scss'
import $ from "jquery"
window.$ = $
//window.jQuery = jQuery

// Sound engine - initialized on first user interaction
let sounds = {};
let soundsInitialized = false;

function initSounds() {
  if (soundsInitialized) return;

  sounds = {
    eat: new Audio(require('./assets/sounds/kickass.wav')),
    die: new Audio(require('./assets/sounds/die.wav')),
    levelUp: new Audio(require('./assets/sounds/levelup.wav'))
  };

  sounds.eat.volume = 0.3;
  sounds.die.volume = 0.5;
  sounds.levelUp.volume = 0.4;

  soundsInitialized = true;
}

function playSound(name) {
  if (!soundsInitialized) initSounds();
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(e => console.log('Sound play error:', name, e));
  }
}

//
// 0 < x 29,  0 < y < 39
// snake.direction 0,1,2,3; 0-up, 1-down, 2-left, 3-right
//
//  Next step: 
//  3. Snake Multiple Food
//  4. Sound engine
//  5. Strip image prize   $('#prizepic').css('background', 'url(img/prz1.png) no-repeat')
//  6. Scores w name
//  7. Pause - P

let game = {};
let snake = {};
//let foods = [];
let area = [];

function jujaStart() {

  $('html').keydown(function (e) {
    initSounds();
    keyHandler(e)
  });

  $('#main').click(function() {
    initSounds();
  });

  init();
  startLoop();
}

function startLoop() {
  game.started = Date.now()
  game.score = 0;
  game.lastUpdate = 0;
  game.cycle = requestAnimationFrame(gameLoop);
  return;
}

function gameLoop(timestamp) {
  if (snake.dead) {
    cancelAnimationFrame(game.cycle);
    return;
  }

  if (!game.pause) {
    if (timestamp - game.lastUpdate >= game.speed) {
      update();
      game.lastUpdate = timestamp;
    }
    draw();
  }

  game.cycle = requestAnimationFrame(gameLoop);
}

function update() {
  //console.log('update:', snake)
  area[snake.y][snake.x] = 2 //body on old coords

  // up
  if (snake.direction == 0) {
    if (snake.y != -1) { snake.y = snake.y - 1 }
    if (snake.y == -1) { snake.y = 29 }
  }

  // down
  if (snake.direction == 1) {
    if (snake.y != 30) { snake.y = snake.y + 1 }
    if (snake.y == 30) { snake.y = 0 }
  }

  // left
  if (snake.direction == 2) {
    if (snake.x != -1) { snake.x = snake.x - 1 }
    if (snake.x == -1) { snake.x = 39 }
  }

  // right
  if (snake.direction == 3) {
    if (snake.x != 40) { snake.x = snake.x + 1 }
    if (snake.x == 40) { snake.x = 0 }
  }

  let chk = area[snake.y][snake.x]
  //console.log('chk',chk)

  switch (chk) {
    case 2:
      playSound('die');
      snake.dead = true;
      break;
    case 3:
      playSound('eat');
      game.score += 10 * game.level;
      snake.bodylength = snake.bodylength + 5;
      game.foodsOnScreen--;
      game.foods--;
      if (game.foods < 1) {
        game.level++;
        playSound('levelUp');
        startLoop();
      }
      break;
  }

  area[snake.y][snake.x] = 1 //snake head new coord
  snake.body.push({
    x: snake.x,
    y: snake.y
  })

  while (snake.body.length > snake.bodylength) {
    let c = snake.body.shift();
    area[c.y][c.x] = 0;
  }

  // Food (prize) check
  if (game.foodsOnScreen < 1) {
    let foodX, foodY;
    do {
      foodX = Math.floor(Math.random() * 40);
      foodY = Math.floor(Math.random() * 30);
    } while (area[foodY][foodX] !== 0);
    area[foodY][foodX] = 3;
    game.foodsOnScreen = 1;
  }
}//update

function draw() {
  const tileEmpty = 'tile';
  const tileSnakeHead = 'snake-head';
  const tileSnakeBody = 'snake-body';
  const tileFood = 'food';
  let currentTile = tileEmpty;

  $("#sco").text(game.score);
  $("#lvl").text(game.level)

  // Only update changed tiles instead of rebuilding entire grid
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 40; j++) {
      const index = i * 40 + j;
      const $tile = $('#fence').children().eq(index);
      
      if (area[i][j] == 0) { currentTile = tileEmpty }
      if (area[i][j] == 1) { currentTile = tileSnakeHead }
      if (area[i][j] == 2) { currentTile = tileSnakeBody }
      if (area[i][j] == 3) { currentTile = tileFood }
      
      // Only update if class changed
      if (!$tile.hasClass(currentTile)) {
        $tile.attr('class', currentTile);
      }
    }
  }
}

function keyHandler(e) {
  let key = e.which;

  switch (key) {
    case (37):  // left
      if (snake.direction !== 3) snake.direction = 2;
      break;
    case (38):  // up
      if (snake.direction !== 1) snake.direction = 0;
      break;
    case (39):  // right
      if (snake.direction !== 2) snake.direction = 3;
      break;
    case (40):  // down
      if (snake.direction !== 0) snake.direction = 1;
      break;
    case (27):  // ESC
      snake.dead = true;
      break;
    case (32):  // Space
      game.pause = !game.pause
      break;
    case (13):  // Enter
      startLoop()
      break;
  }
}

function init() {

  snake.x = 15; //координаты головы
  snake.y = 19; //координаты головы
  snake.direction = 3;
  snake.dead = false;
  snake.body = [];
  snake.bodylength = 10;

  snake.body.push({
    x: snake.x,
    y: snake.y
  })

  game.score = 0;
  game.level = 1;
  game.foodsOnScreen = 0;
  game.speed = 0;
  game.foods = 0;
  game.pause = false;

  $("#sco").text(game.score)
  $("#lvl").text(game.level)

  //Скорость и кол-во призов для завершения уровня, зависит от уровня

  switch (game.level) {
    case 1: game.speed = 400; game.foods = 3; break;
    case 2: game.speed = 380; game.foods = 5; break;
    case 3: game.speed = 360; game.foods = 7; break;
    case 4: game.speed = 340; game.foods = 9; break;
    case 5: game.speed = 320; game.foods = 11; break;
    default: game.speed = 444;
  }

  // создать поле area[row 0..29][col 0..39]
  area = [];

  for (let i = 0; i < 30; i++) {
    area[i] = [];
  }

  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 40; j++) {
      area[i][j] = 0
    }
  }

  // Build the grid DOM once
  $('#fence').empty();
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 40; j++) {
      $('#fence').append(`<div class='tile'></div>`);
    }
  }
}

function checkJquery() {
  if (window.$) {
    jujaStart();
  } else {
    setTimeout(checkJquery, 50);
  }
}

checkJquery();

