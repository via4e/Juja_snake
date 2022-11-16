import './assets/style.scss'
import $ from "jquery"
window.$ = $
//window.jQuery = jQuery

console.log('Legend of Juja Snake v.1.2  2011 - 12.02.2022');

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
    keyHandler(e)
  });

  init();
  startLoop();
}

function startLoop() {
  game.started = Date.now()
  game.score = 0;
  game.cycle = setInterval(loop, game.speed)
  return;
}

function loop() {

  if (!game.pause){
    draw();
    update();
  }

  if (snake.dead) {
    console.log('i see, snake dead');
    clearInterval(game.cycle);
  }
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
      console.log('Snake die.');
      snake.dead = true;
      break;
    case 3:
      console.log('Snake take food.');
      game.score += 10 * game.level;
      snake.bodylength = snake.bodylength + 5;
      game.foodsOnScreen--;
      game.foods--;
      if (game.foods < 1) {
        game.level++;
        // сделат проверку увеличения уровня игры
        console.log('start next level', game.level)
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
      let x = Math.round(Math.random() * 40);
      let y = Math.round(Math.random() * 30);
      if (area[x][y] === 0) {
        area[x][y] = 3;
      } //if empty field, set food there
    }
    game.foodsOnScreen = 1;
}//update

function draw() {
  console.log ("draw:", snake, Date.now() )
  const tileEmpty = 'tile';
  const tileSnakeHead = 'snake-head';
  const tileSnakeBody = 'snake-body';
  const tileFood = 'food';
  let currentTile = tileEmpty;
  // let c = 0;

  $('#fence').empty();
  $("#sco").text(game.score);
  $("#lvl").text(game.level)

  for (let i in area) {
    for (let j = 0; j < 40; j++) {
      // c++;
      if (area[i][j] == 0) { currentTile = tileEmpty }
      if (area[i][j] == 1) { currentTile = tileSnakeHead } //head
      if (area[i][j] == 2) { currentTile = tileSnakeBody } //body 
      if (area[i][j] == 3) { currentTile = tileFood } //food                     
      $('#fence').append(`<div class='` + currentTile + `'></div>`)
    }
  }
}

function keyHandler(e) {
  // e.which --->   Enter-13   Space-32
  console.log ('key:', e.which)
  let key = e.which;

  switch (key) {
    case (37):  // left
      snake.direction = 2;
      break;
    case (38):  // up
      snake.direction = 0;
      break;
    case (39):  // right
      snake.direction = 3;
      break;
    case (40):  // down
      snake.direction = 1;
      break;
    case (27):  // ESC
      console.log('ESC'); snake.dead = true;
      break;
    case (32):  // Space
      console.log('Spacebar (pause)', snake, game, area);
      game.pause = !game.pause
      break;
    case (13):  // Enter
      console.log('Restart game');
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

  for (let i in area) {
    for (let j = 0; j < 40; j++) {
      area[i][j] = 0
    }
  }
}

function checkJquery() {
  console.log('chkjq---')
  if (window.$) {
    jujaStart();
  } else {
    console.log('wait jq loading');
    setTimeout(checkJquery, 50);
  }
}

checkJquery();

