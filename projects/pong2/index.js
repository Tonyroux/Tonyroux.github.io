/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var keys = {
    "A": 65,
    "D": 68,

    "left": 37,
    "right": 39,
  };

  var boardWidth = $('#board').width();
  var boardHeight = $('#board').height();
  
  // Game Item Objects
  function makeItem(x, y, velX, velY, id) {
    var itemInstance = {
      x: x,
      y: y,
      width: $(id).width(),
      height: $(id).width(),
      speedX: velX,
      speedY: velY,
      id: id
    };
    return itemInstance;
  }

  var bottomPaddle = makeItem(((boardWidth / 2) - ($("#bottomPad").width() / 2)), boardHeight - 50, 0, 0, "#bottomPad");

  var topPaddle = makeItem(((boardWidth / 2) - ($("#topPad").width() / 2)), 20, 0, 0, "#topPad");

  var ball = makeItem(boardWidth / 2, boardHeight / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -1 : 1), "#ball");

  //game vars
  var score1 = 0;
  var score2 = 0;
  var oneWin = "Player One wins!";
  var twoWin = "Player Two wins!";

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyD);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyU);
  $("#oldSchool").on('click', applyFilter);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawItem(bottomPaddle);
    drawItem(topPaddle);
    drawItem(ball);
    paddleBounds(bottomPaddle);
    paddleBounds(topPaddle);
    ballBounds(ball);

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyD(event) {
    event.which == keys.A ? topPaddle.speedX = -5 : 0;
    event.which == keys.D ? topPaddle.speedX = 5 : 0;
    event.which == keys.left ? bottomPaddle.speedX = -5 : 0;
    event.which == keys.right ? bottomPaddle.speedX = 5 : 0;
  }

  function handleKeyU(event) {
    event.which == keys.A ? (topPaddle.speedX < 0 ? topPaddle.speedX = 0 : 0) : 0;
    event.which == keys.D ? (topPaddle.speedX > 0 ? topPaddle.speedX = 0 : 0) : 0;
    event.which == keys.left ? (bottomPaddle.speedX < 0 ? bottomPaddle.speedX = 0 : 0) : 0;
    event.which == keys.right ? (bottomPaddle.speedX > 0 ? bottomPaddle.speedX = 0 : 0) : 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function drawItem(obj) {
    obj.y += obj.speedY; // update the position of paddleLeft along the y-axis
    obj.x += obj.speedX;
    $(obj.id).css("top", obj.y); // draw paddleLeft in the new location, positionY pixels away from the "top"
    $(obj.id).css("left", obj.x);
  }

  function paddleBounds(obj) {
    if (obj.x < 0) {
      $(obj.id).css("left", 0)
      obj.x = 0;
    }
    if (obj.x > (boardWidth - obj.width)) {
      $(obj.id).css("left", (boardWidth - obj.width))
      obj.x = (boardWidth - obj.width);
    }
  }
  function ballBounds(obj) {
    //wall collisions
    if (obj.x < 0) {
      $(obj.id).css("left", 0)
      obj.x = 0;
      obj.speedX = -obj.speedX;
    }
    if (obj.x > (boardWidth - obj.width)) {
      $(obj.id).css("left", (boardWidth - obj.width))
      obj.x = (boardWidth - obj.width);
      obj.speedX = -obj.speedX;
    }

    //paddle collisions
    if (obj.y <= (topPaddle.y + 20) && obj.x > topPaddle.x && obj.x < (topPaddle.x + topPaddle.width) && obj.y >= (topPaddle.y - 20) && obj.speedY < 0) {
      obj.speedY = -obj.speedY;
    }
    if (obj.y >= (bottomPaddle.y - 20) && obj.x > bottomPaddle.x && obj.x < (bottomPaddle.x + bottomPaddle.width) && obj.y <= (bottomPaddle.y + 20) && obj.speedY > 0) {
      obj.speedY = -obj.speedY;
    }
    //paddle sides
    if (obj.x == topPaddle.x + topPaddle.width || obj.x == topPaddle.x - obj.width) {
      if (obj.y < topPaddle.y + 20 && obj.y > topPaddle.y - 20) {
        obj.speedX = -obj.speedX;
      }
    }
    if (obj.x == bottomPaddle.x + bottomPaddle.width || obj.x == bottomPaddle.x - obj.width) {
      if (obj.y < bottomPaddle.y - 20 && obj.y > bottomPaddle.y + 20) {
        obj.speedX = -obj.speedX;
      }
    }

    //victory triggers
    if (obj.y <= 0) {
      score2 ++;
      ball = makeItem(boardWidth / 2, boardHeight / 2, (Math.random() > 0.5 ? -3 : 3), 1, "#ball");
      updateScore(score2, "#score2");
    }
    if (obj.y >= boardHeight - obj.height) {
      score1 ++;
      ball = makeItem(boardWidth / 2, boardHeight / 2, (Math.random() > 0.5 ? -3 : 3), -1, "#ball");
      updateScore(score1, "#score1");
    }
  }

  function updateScore (newScore, tag) {
    $(tag).text(newScore);
    if (newScore == 3) {
      handleVictory(tag)
    }
  }

  function handleVictory (scoreTag) {
    if (scoreTag == "#score1") {
      $("#winner").text(oneWin);
    }
    else {
      $("#winner").text(twoWin);
    }
    $("#winner").css("left", (boardWidth / 2) - ($("#winner").width() / 2));
    $("#winner").css("top", (boardHeight / 2) - ($("#winner").height() / 2));
    $("#playAgain").css("left", (boardWidth / 2) - ($("#playAgain").width() / 2) - 15);
    $("#playAgain").css("top", (boardHeight * 0.66) - ($("#playAgain").height() / 2));
    $("#ball").css("left", boardWidth * 4);
    setInterval(function() {
      endGame();
    }, 10);
  }

  function applyFilter() {
    $(".game").css("z-index") == 3 ? $(".game").css("z-index", -1) : $(".game").css("z-index", 3);
  }
  
  function endGame() { 
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
