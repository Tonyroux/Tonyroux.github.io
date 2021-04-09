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

  var bike2 = makeItem(($("#board").width() / 20) - 4, ($("#board").height() / 20) - 4, -20, 0, "#bike2", "rgb(103, 198, 249)");

  var player2 = [bike2];

  var score1 = 0;
  var score2 = 0;

  var pause = false;

  updateScore(player1, score1);
  updateScore(player2, score2);

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
    if (pause == false) {
      redrawGameItem(player1);
      redrawGameItem(player2);

      checkWalls(player1);
      checkWalls(player2);

      checkSelf(player1, player2);
      checkSelf(player2, player1);
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(pause == false) {
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
    if($(player[0].id).css("z-index") !== 3) {
      $(player[0].id).css("z-index", 3);
    }
    for (var i = 0; i < player.length; i++) {
      let obj = player[i]

      if (obj == player[0]) {
          obj.prevX = obj.x
          obj.x += obj.speedX;

          obj.prevY = obj.y
          obj.y += obj.speedY;
      }

      else {
        if (player[i] = player[player.length - 1]) {
          obj.x = player[i - 1].prevX;
          obj.y = player[i - 1].prevY;
          if ($(obj.id).css("z-index") == -2) {
            $(obj.id).css("z-index", 1)
          }
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
      }
      
      $(obj.id).css("left", obj.x);
      $(obj.id).css("top", obj.y);
    }

    if (player.length < 101) {
      addTrail(player);
    }
  }

  function checkWalls(player) {
    if (pause == false) {
      let obj = player[0];

      if (obj.x < 0 || obj.x > $("#board").width() - 20 || obj.y < 0 || obj.y > $("#board").height() - 20) {
        killPlayer(player);
      }
    }
  }

  function checkSelf(player, opponent) {
    if (pause == false) {
      let bike = player[0];

      for (var i = 1; i < player.length; i++) {
        if (bike.x == player[i].x && bike.y == player[i].y) {
          killPlayer(player);
        }
        if (bike.x == opponent[i].x && bike.y == opponent[i].y) {
          killPlayer(player);
        }
      }

      bike.x > bike.prevX ? bike.canLeft = false : bike.canLeft = true;
      bike.x < bike.prevX ? bike.canRight = false : bike.canRight = true;
      bike.y > bike.prevY ? bike.canUp = false : bike.canUp = true;
      bike.y < bike.prevY ? bike.canDown = false : bike.canDown = true;
    }
  }

  function tieDeath(obj1, obj2) {
    let bike1 = obj1[0];
    let bike2 = obj2[0];

    for (var i = 1; i < obj1.length; i++) {
      if (bike1.x == obj1[i].x && bike1.y == obj1[i].y) {
        if(bike2.x == obj2[i].x && bike2.y == obj2[i].y) {
          return true;
        }
        if(bike2.x == obj1[i].x && bike2.y == obj1[i].y) {
          return true;
        }
      }

      if (bike1.x == obj2[i].x && bike1.y == obj2[i].y) {
        if(bike2.x == obj2[i].x && bike2.y == obj2[i].y) {
          return true;
        }
        if(bike2.x == obj1[i].x && bike2.y == obj1[i].y) {
          return true;
        }
      }
    }

    if (bike1.x < 0 || bike1.x > $("#board").width() - 20 || bike1.y < 0 || bike1.y > $("#board").height() - 20) {
      if (bike2.x < 0 || bike2.x > $("#board").width() - 20 || bike2.y < 0 || bike2.y > $("#board").height() - 20) {
        return true;
      }
    }
  }

  function addTrail (player) {
    $('<div id="' + player[0].passId + 'trail' + (player.length - 1) + '" class = "trail" style= "z-index: -2; background-color:' + player[0].color + ';"></div>').insertAfter(player[0].id);
    player.push(makeItem(player[player.length - 1].prevX / 20, player[player.length - 1].prevY / 20, 0, 0, "#" + player[0].passId + 'trail' + (player.length - 1)))
  }

  function killPlayer(player) {
    if (pause == false) {
      pause = true;
      player1[0].speedX = 0;
      player1[0].speedY = 0;
      player2[0].speedX = 0;
      player2[0].speedY = 0;

      if (tieDeath(player1, player2)){
        if (Math.random() < 0.5) {
          score2 ++;
          updateScore(player2, score2);
        }
        else {
          score1 ++;
          updateScore(player1, score1);
        }
      } 

      else {
        if (player == player1) {
          score2 ++;
          updateScore(player2, score2);
        }
        else if (player == player2) {
          score1 ++;
          updateScore(player1, score1);
        } 
      }
      
      $(".trail").remove();
      player1 = [bike1];
      player2 = [bike2];

      

      resetGame();
    }
  }

  function updateScore(player, score){
    $(player[0].id + "score").text(score);
  }

  function resetGame() {
    $("#screenText").text(3);
    $("#screenText").css("z-index", 3);

    $("#bike1").css("z-index", -2);
    $("#bike2").css("z-index", -2);

    $("#bike1").css("left", 0);
    $("#bike2").css("left", 0);
    $("#bike1").css("top", 0);
    $("#bike2").css("top", 0);

    console.log("reset in: 3");
    setTimeout(function() {
      $("#screenText").text(2);
      console.log("reset in: 2");
    }, 1100);
    setTimeout(function() {
      $("#screenText").text(1);
      console.log("reset in: 1");
    }, 2200);
    setTimeout(function() {
      $("#screenText").text(0);
      console.log("reset in: 0");
    }, 3300);

    setTimeout(function() {
      createBikes();
      console.log("creating bikes!");
      $("#screenText").css("z-index", -2);
    }, 4400);
  }

  function createBikes() {
    
    bike1 = makeItem(3, 3, 20, 0, "#bike1", "rgb(242, 225, 94)", "Player 1: ");

    player1 = [bike1];

    bike2 = makeItem(($("#board").width() / 20) - 4, ($("#board").height() / 20) - 4, -20, 0, "#bike2", "rgb(103, 198, 249)", "Player 2: ");

    player2 = [bike2];

    pause = false;
  }
}
