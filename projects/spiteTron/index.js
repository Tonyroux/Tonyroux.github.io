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
    "A": 65,
    "D": 68,
    "W": 87,
    "S": 83,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  }
  
  // Game Item Objects
  
  function makeItem(x, y, velX, velY, id, color) {
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
      id: id,
      passId: id.substring(1, id.length),
      canLeft: velX > 0 ? false : true,
      canRight: velX < 0 ? false : true,
      canUp: velY > 0 ? false : true,
      canDown: velY < 0 ? false : true, 
      color: color,
    };
    return itemInstance;
  }

  var bike1 = makeItem(3, 3, 20, 0, "#bike1", "rgb(242, 225, 94)");

  var player1 = [bike1];

  var playerLength1 = player1.length;

  var bike2 = makeItem(12, 9, -20, 0, "#bike2", "rgb(103, 198, 249)");

  var player2 = [bike2];

  var playerLength2 = player2.length;

  var pause = false;

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
    redrawGameItem(player1);
    redrawGameItem(player2);

    checkWalls(player1);
    checkWalls(player2);

    checkSelf(player1);
    checkSelf(player2);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(!pause)
    if (event.which == KEY.W) {
      console.log("up");
      if (bike1.speedY == 0 && bike1.canUp) {
        bike1.speedY = -20;
        bike1.speedX = 0;
      }
    }
    if (event.which == KEY.S) {
      console.log("down");
      if (bike1.speedY == 0 && bike1.canDown) {
        bike1.speedY = 20;
        bike1.speedX = 0;
      }
    }
    if (event.which == KEY.D) {
      console.log("right");
      if (bike1.speedX == 0 && bike1.canRight) {
        bike1.speedY = 0;
        bike1.speedX = 20;
      }
    }
    if (event.which == KEY.A) {
      console.log("left");
      if (bike1.speedX == 0 && bike1.canLeft) {
        bike1.speedY = 0;
        bike1.speedX = -20;
      }
    }

    if (event.which == KEY.UP) {
      console.log("up");
      if (bike2.speedY == 0 && bike2.canUp) {
        bike2.speedY = -20;
        bike2.speedX = 0;
      }
    }
    if (event.which == KEY.DOWN) {
      console.log("down");
      if (bike2.speedY == 0 && bike2.canDown) {
        bike2.speedY = 20;
        bike2.speedX = 0;
      }
    }
    if (event.which == KEY.RIGHT) {
      console.log("right");
      if (bike2.speedX == 0 && bike2.canRight) {
        bike2.speedY = 0;
        bike2.speedX = 20;
      }
    }
    if (event.which == KEY.LEFT) {
      console.log("left");
      if (bike2.speedX == 0 && bike2.canLeft) {
        bike2.speedY = 0;
        bike2.speedX = -20;
      }
    }

    if (event.which == KEY.ENTER) {
      console.log("enter");
      bike1.speedY = 0;
      bike1.speedX = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  /*function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }*/

  function redrawGameItem(player) {
    for (var i = 0; i < player.length; i++) {
      let obj = player[i]

      if (obj == player[0]) {
          obj.prevX = obj.x
          obj.x += obj.speedX;

          obj.prevY = obj.y
          obj.y += obj.speedY;
      }

      else {
        obj.prevX = obj.x;
        obj.x = player[i - 1].prevX;
        obj.prevY = obj.y;
        obj.y = player[i - 1].prevY;
        if ($(obj.id).css("z-index") == -2) {
          $(obj.id).css("z-index", 1)
        }
      }
      
      $(obj.id).css("left", obj.x);
      $(obj.id).css("top", obj.y);
    }

    if (player.length < 61) {
      addTrail(player);
    }
  }

  function checkWalls(player) {
    let obj = player[0];

    if (obj.x < 0 || obj.x > $("#board").width() - 20 || obj.y < 0 || obj.y > $("#board").height() - 20) {
      //killPlayer(player);
    }
  }

  function checkSelf(player) {
    let bike = player[0];

    for (var i = 1; i < player.length; i++) {
      if (bike.x == player[i].x && bike.y == player[i].y) {
        //killPlayer(player);
      }
    }

    bike.x > bike.prevX ? bike.canLeft = false : bike.canLeft = true;
    bike.x < bike.prevX ? bike.canRight = false : bike.canRight = true;
    bike.y > bike.prevY ? bike.canUp = false : bike.canUp = true;
    bike.y < bike.prevY ? bike.canDown = false : bike.canDown = true;
  }

  function addTrail (player) {
    $('<div id="' + player[0].passId + 'trail' + (player.length - 1) + '" class = "trail" style= "z-index: -2; background-color:' + player[0].color + ';"></div>').insertAfter(player[0].id);
    player.push(makeItem(player[player.length - 1].prevX / 20, player[player.length - 1].prevY / 20, 0, 0, "#" + player[0].passId + 'trail' + (player.length - 1)))
  }

  function killPlayer(player) {
    pause = true;
    player1.speedX = 0;
    player1.speedY = 0;
    player2.speedX = 0;
    player2.speedY = 0;

    updateScore(player);
  }

  function updateScore(player){
    $("#score").text(player.length - 4);
  }
}
