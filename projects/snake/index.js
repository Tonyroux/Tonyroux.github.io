/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "ENTER": 13,
    "LEFT": 65,
    "RIGHT": 68,
    "UP": 87,
    "DOWN": 83,
  }
  
  // Game Item Objects
  
  function makeItem(x, y, velX, velY, id) {
    var itemInstance = {
      x: x * 20,
      y: y * 20,
      prevX: x * 20,
      prevY: y * 20,
      width: $(id).width(),
      originalW: $(id).width(),
      height: $(id).height(),
      left: x * 20,
      right: (x * 20) + $(id).width(),
      top: y * 20,
      bottom: (y * 20) + $(id).height(),
      speedX: velX,
      speedY: velY,
      id: id
    };
    return itemInstance;
  }

  var fruit = makeItem(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), 0, 0, "#fruit");
  repositionFruit();

  var snakeHead = makeItem(5, 6, 20, 0, "#snakeHead");

  var snakeTotal = [snakeHead];

  for (var i = 0; i < 3; i++) {
    $('<div id="snakeBody' + i + '" class = "snake"></div>').insertAfter("#snakeHead");
    snakeTotal.push(makeItem(5, (snakeTotal[i].y / 20) + 1, 0, 0, "#snakeBody" + i))
  }

  var snakeLength = snakeTotal.length;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    snakeLength = snakeTotal.length;
    redrawGameItem(snakeTotal);
    checkWalls(snakeTotal);
    checkSelf(snakeTotal);
    checkFruit(snakeTotal, fruit);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which == KEY.UP) {
      console.log("up");
      if (snakeHead.speedY == 0) {
        snakeHead.speedY = -20;
        snakeHead.speedX = 0;
      }
    }
    if (event.which == KEY.DOWN) {
      console.log("down");
      if (snakeHead.speedY == 0) {
        snakeHead.speedY = 20;
        snakeHead.speedX = 0;
      }
    }
    if (event.which == KEY.RIGHT) {
      console.log("right");
      if (snakeHead.speedX == 0) {
        snakeHead.speedY = 0;
        snakeHead.speedX = 20;
      }
    }
    if (event.which == KEY.LEFT) {
      console.log("left");
      if (snakeHead.speedX == 0) {
        snakeHead.speedY = 0;
        snakeHead.speedX = -20;
      }
    }
    if (event.which == KEY.ENTER) {
      console.log("enter");
      snakeHead.speedY = 0;
      snakeHead.speedX = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionFruit() {
    fruit = makeItem(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), 0, 0, "#fruit");
    $(fruit.id).css("left", fruit.x);
    $(fruit.id).css("top", fruit.y);
  }

  function redrawGameItem(snake) {
    for (var i = 0; i < snakeLength; i++) {
      let obj = snake[i]

      if (obj == snake[0]) {
          obj.prevX = obj.x
          obj.x += obj.speedX;

          obj.prevY = obj.y
          obj.y += obj.speedY;
      }

      else {
        obj.prevX = obj.x;
        obj.x = snake[i - 1].prevX;
        obj.prevY = obj.y;
        obj.y = snake[i - 1].prevY;
        if ($(obj.id).css("z-index") == -2) {
          $(obj.id).css("z-index", 1)
        }
      }
      
      //console.log("newPosX: " + newPosX + ", newPosY: " + newPosY + ", velY: " + velocityY + ", velX: " + velocityX);
      $(obj.id).css("left", obj.x);
      $(obj.id).css("top", obj.y);
    }
  }

  function checkWalls(snake) {
    let obj = snake[0];

    if (obj.x < 0 || obj.x > 420 || obj.y < 0 || obj.y > 420) {
      endGame();
    }
  }

  function checkSelf(snake) {
    let head = snake[0];

    for (var i = 1; i < snakeLength; i++) {
      if (head.x == snake[i].x && head.y == snake[i].y) {
        endGame();
      }
    }
  }
  
  function checkFruit(snake, fruit) {
    let head = snake[0];

    if (head.x == fruit.x && head.y == fruit.y) {
      addSegment();
      repositionFruit();
      updateScore();
    }
  }

  function addSegment () {
    $('<div id="snakeBody' + (snakeTotal.length - 1) + '" class = "snake" style= "z-index: -2;"></div>').insertAfter("#snakeHead");
    snakeTotal.push(makeItem(snakeTotal[snakeTotal.length - 1].prevX / 20, snakeTotal[snakeTotal.length - 1].prevY / 20, 0, 0, "#snakeBody" + (snakeTotal.length - 1)))
  }

  function updateScore(){
    $("#score").text(snakeTotal.length - 4);
  }
}
