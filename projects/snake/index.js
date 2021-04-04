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

  var positionX = 0; // the x-coordinate location for the box
  var velocityX = 0; // the velocity for the box along the x-axis
  var positionY = 100; // the y-coordinate location for the box
  var velocityY = 0; // the velocity for the box along the y-axis
  var newPosX = positionX;
  var newPosY = positionY;

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
    redrawGameItem("#snakeHead");

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which == KEY.UP) {
      console.log("up");
      if (positionY > 0 && velocityY == 0) {
        velocityY = -20;
        velocityX = 0;
      }
    }
    if (event.which == KEY.DOWN) {
      console.log("down");
      if (positionY < 390 && velocityY == 0) {
        velocityY = 20;
        velocityX = 0;
      }
    }
    if (event.which == KEY.RIGHT) {
      console.log("right");
      if (positionX < 390 && velocityX == 0) {
        velocityY = 0;
        velocityX = 20;
      }
    }
    if (event.which == KEY.LEFT) {
      console.log("left");
      if (positionX > 0 && velocityX == 0) {
        velocityY = 0;
        velocityX = -20;
      }
    }
    if (event.which == KEY.ENTER) {
      console.log("enter");
      velocityY = 0;
      velocityX = 0;
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

  function repositionGameItem() {

  }

  function redrawGameItem(item) {
    //newPosX = $(item).css("left");
    //newPosY = $(item).css("top");
    if (newPosX + velocityX < 440 && newPosX + velocityX >= 0) {
      newPosX += velocityX;
    }
    if (newPosY + velocityY < 440 && newPosY + velocityY >= 0) {
      newPosY += velocityY;
    }
    console.log("newPosX: " + newPosX + ", newPosY: " + newPosY + ", velY: " + velocityY + ", velX: " + velocityX);
    $(item).css("left", newPosX);
    $(item).css("top", newPosY);
    positionX = newPosX;
    positionY = newPosY;
  }
  
}
