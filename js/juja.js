'use strict'
console.log('Legend of Juja Snake v.1.2  2011 - 12.02.2018');

//
// 0 < x 29,  0 < y < 39
// snake.direction 0,1,2,3; 0-up, 1-down, 2-left, 3-right
//
//  Next step: 
//  3. Snake Food
//  4. Sound engine
//  5. Strip image prize
//  6. Scores w name
//  7. Pause - P

let game={};
let snake={};
let foods=[];
let area=[];

function jujaStart () {

// как тут сразу keyHandler вызвать, а не внутри function
    $('html').keydown( function (e) {
        keyHandler (e)
    });
 
    startLoop();
}

function startLoop () {
    init();
    game.started = Date.now()
    game.score=0;
    game.cycle = setInterval(loop, game.speed)
    return;
}

function loop () {
    update();
    draw();

    if (snake.dead) {
        console.log('i see, snake dead');
        clearInterval(game.cycle);
    }
}

function update () {
    //console.log('update:', snake)
    area[snake.y][snake.x]=2 //body on old coords

    // up
    if (snake.direction==0) {
        if (snake.y!=-1) {snake.y = snake.y-1}
        if (snake.y==-1) {snake.y = 29}
    }

    // down
    if (snake.direction==1) {
        if (snake.y!=30) {snake.y = snake.y+1}
        if (snake.y==30) {snake.y = 0}
    }

    // left
    if (snake.direction==2) {
        if (snake.x!=-1) {snake.x = snake.x-1}
        if (snake.x==-1) {snake.x = 39}
    }

    // right
    if (snake.direction==3) {
        if (snake.x!=40) {snake.x = snake.x+1}
        if (snake.x==40) {snake.x = 0}
    }

    let chk = area[snake.y][snake.x]
    console.log('chk',chk)

    switch (chk) {
        case 2:
           console.log ('Snake die.');
           snake.dead = true;
           break;
        case 3:
           console.log ('Snake take food.');
           game.score += 10 * game.level;
           game.foodsOnScreen--;
           console.log('score', game.score)
           if (game.foods<1) {
             game.level++;
             // сделат проверку увеличения уровня игры
             console.log('start next level', game.level)
             startLoop();
           }
           break;           
    } 
    
    area[snake.y][snake.x]=1 //snake head new coord

    // Food (prize) check
    if (game.foodsOnScreen < 1) {
        let x = Math.round(Math.random() * 40);
        let y = Math.round(Math.random() * 30);
        game.foodsOnScreen = 1;

        console.log('!',x,y,area)
        
        debugger;
        area[x][y]=3;
        debugger;
    }
}

function draw () {

 //console.log ("draw:", snake, Date.now() )
 let   t = 'tile';
 let tsh = 'snake-head';
 let tsb = 'snake-body';
 let  tf = 'food';
 $('#fence').empty();
 let c=0;

 for (let i in area) {
      for (let j=0; j<40; j++) {
        c++; 
        let a=t;
        if (area[i][j]==0) { a=t }
        if (area[i][j]==1) { a=tsh } //head
        if (area[i][j]==2) { a=tsb } //body 
        if (area[i][j]==3) { a=tf } //food                     
        $('#fence').append(`<div class='`+ a + `'></div>`)
      }
 }

}

function keyHandler (e) {
    // e.which --->   Enter-13   Space-32
    //console.log ('key:', e.which)
    let key=e.which;

    switch (key) {
        case (37):  // left
           snake.direction=2;
           break;
        case (38):  // up
           snake.direction=0;
           break;
        case (39):  // right
           snake.direction=3;
           break;
        case (40):  // down
           snake.direction=1;
           break;  
        case (27):  // ESC
           console.log('ESC'); snake.dead = true;
           break;  
        case (32):  // Space
           console.log('Spacebar', snake, game, area); 
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

    game.score=0;
    game.level=1;
    game.foodsOnScreen=0

    //Скорость и кол-во призов для завершения уровня, зависит от уровня

    switch (game.level) {
      case 1: game.speed = 1000; game.foods = 1; break;
      case 2: game.speed = 900; game.foods = 2; break;
      case 3: game.speed = 800; game.foods = 4; break;
      case 4: game.speed = 750; game.foods = 6; break;
      case 5: game.speed = 600; game.foods = 8; break;                        
      default: game.speed = 444; 
    }

    // создать поле area[row 0..29][col 0..39]
    area=[];

    for (let i=0; i<30; i++) {
        area[i]=[];
    }
    
    for (let i in area) {
      for (let j=0; j<40; j++) {
         area[i][j]=0
      }
    }    
}

function checkJquery() {
    if (window.$){
        jujaStart();
    } else {
    	console.log('wait jq loading');
        setTimeout(checkJquery, 50);
    }
}

checkJquery();

