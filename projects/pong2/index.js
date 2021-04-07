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
      originalW: $(id).width(),
      height: $(id).height(),
      left: x,
      right: x + $(id).width(),
      top: y,
      bottom: y + $(id).height(),
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
  var winningScore = prompt("How many points should be required to win?")
  checkWinCount();
  var oneWin = "Player One wins!";
  var twoWin = "Player Two wins!";
  var challenge = false;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyD);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyU);
  $("#oldSchool").on('click', applyFilter);
  $("#challenge").on('click', challengeMode);

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

    redrawBounds(obj);
  }

  function redrawBounds(obj) {
    obj.left = obj.x;
    obj.right = obj.x + obj.width;
    obj.top = obj.y;
    obj.bottom = obj.y + obj.height;
  }

  function paddleBounds(obj) {
    if (obj.left < 0) {
      $(obj.id).css("left", 0)
      obj.x = 0;
    }
    if (obj.right > boardWidth) {
      $(obj.id).css("left", (boardWidth - obj.width))
      obj.x = (boardWidth - obj.width);
    }
  }

  function ballBounds(obj) {
    //wall collisions
    if (obj.left < 0) {
      $(obj.id).css("left", 0)
      obj.x = 0;
      obj.speedX = -obj.speedX;
    }
    if (obj.right > boardWidth) {
      $(obj.id).css("left", (boardWidth - obj.width))
      obj.x = (boardWidth - obj.width);
      obj.speedX = -obj.speedX;
    }

    //paddle collisions
    if (obj.top <= topPaddle.bottom && obj.left > topPaddle.left && obj.right < topPaddle.right && obj.top >= topPaddle.top && obj.speedY < 0) {
      obj.speedY = -obj.speedY;
      if (challenge == true) {
        changePaddle(topPaddle);
      }
    }
    if (obj.bottom >= bottomPaddle.top && obj.left > bottomPaddle.left && obj.right < bottomPaddle.right && obj.bottom <= bottomPaddle.bottom && obj.speedY > 0) {
      obj.speedY = -obj.speedY;
      if (challenge == true) {
        changePaddle(bottomPaddle);
      }
    }
    //paddle sides
    if (obj.left <= topPaddle.right && obj.left >= topPaddle.right - 15) {
      if (obj.top < topPaddle.bottom && obj.bottom > topPaddle.top) {
        obj.speedX = 3;
      }
    }
    if (obj.right >= topPaddle.left && obj.right <= topPaddle.left + 15) {
      if (obj.top < topPaddle.bottom && obj.bottom > topPaddle.top) {
        obj.speedX = -3;
      }
    }
    if (obj.left <= bottomPaddle.right && obj.left >= bottomPaddle.right - 15) {
      if (obj.bottom < bottomPaddle.bottom && obj.top > bottomPaddle.top) {
        obj.speedX = 3;
      }
    }
    if (obj.right >= bottomPaddle.left && obj.right <= bottomPaddle.left + 15) {
      if (obj.bottom < bottomPaddle.bottom && obj.top > bottomPaddle.top) {
        obj.speedX = -3;
      }
    }

    //victory triggers
    if (obj.y <= 0) {
      score2 ++;
      ball = makeItem(boardWidth / 2, boardHeight / 2, (Math.random() > 0.5 ? -3 : 3), 1, "#ball");
      updateScore(score2, "#score2");
      changePaddle(topPaddle, "reset");
    }
    if (obj.y >= boardHeight - obj.height) {
      score1 ++;
      ball = makeItem(boardWidth / 2, boardHeight / 2, (Math.random() > 0.5 ? -3 : 3), -1, "#ball");
      updateScore(score1, "#score1");
      changePaddle(bottomPaddle, "reset");
    }
  }

  function updateScore (newScore, tag) {
    $(tag).text(newScore);
    if (newScore == parseInt(winningScore)) {
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
    setInterval(function() {
      endGame();
    }, 10);
  }

  function applyFilter() {
    $(".game").css("z-index") == 3 ? $(".game").css("z-index", -1) : $(".game").css("z-index", 3);
  }

  function challengeMode() {
    challenge = true
  }

  function changePaddle(obj, action) {
    if (action == "reset") {
      $(obj.id).css("width", obj.originalW);
      obj.width = obj.originalW;
    } else {
      $(obj.id).css("width", (Math.random() * (2 * $(obj.id).width())));
      obj.width = $(obj.id).width();
    }
  }

  function checkWinCount() {
    if (Number.isInteger(parseInt(winningScore)) == false) {
      winningScore = prompt("Must be an integer");
      checkWinCount();
    }
    else{}
  }
  
  function endGame() { 
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    $("#ball").css("left", boardWidth * 4);
  }
  
}
