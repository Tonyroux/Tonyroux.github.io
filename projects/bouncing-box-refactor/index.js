/* global $ */
'use strict'
$(document).ready(function(){
    //////////////////////////////////////////////////////////////////
    //////////////////////////// SETUP ///////////////////////////////
    //////////////////////////////////////////////////////////////////

    var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
    var BOARD_HEIGHT = $(window).height();	// what a gross naming scheme

    // Every 50 milliseconds, call the update Function (see below)
    setInterval(update, 50);

    // Every time the box is clicked, call the handleBoxClick Function (see below)
    $('#box').on('click', handleBoxClick);

    var positionX = 0;
    var positionY = 0;
    var speedX = 10;
    var speedY = 10;
    var points = 0;

    //////////////////////////////////////////////////////////////////
    /////////////////////// CORE LOGIC ///////////////////////////////
    //////////////////////////////////////////////////////////////////

    /* 
    This Function will be called 20 times/second. Each time it is called,
    it should move the Box to a new location. If the box drifts off the screen
    turn it around! 
    */
    function update() {
        moveBox();

        dirChange();
    }

    /* 
    This Function will be called each time the box is clicked. Each time it is called,
    it should increase the points total, increase the speed, and move the box to
    the left side of the screen.
    */
    function handleBoxClick() {
        incrPoints();
        
        incrSpeed();
        
        resetPos();

        changeColor();
    }

    //////////////////////////////////////////////////////////////////
    ///////////////// HELPER FUNCTIONS ///////////////////////////////
    //////////////////////////////////////////////////////////////////
    function incrPoints() {
        points += 1;
        $('#box').text(points);
    }

    function incrSpeed() {
        if (speedX >= 0) {
            speedX += 3;
        } 
        else if (speedX < 0) {
            speedX -= 3;
        }
    }

    function resetPos() {
        positionX = 0;
    }

    function changeColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var rgbString = "rgb(" + r + "," + g + "," + b + ")";
        $('#box').css("background-color", rgbString);
    }

    function moveBox() {
        positionX += speedX;
        $('#box').css("left", positionX);

        positionY += speedY;
        $('#box').css("top", positionY);
    }

    function dirChange() {
        if (positionX > BOARD_WIDTH) {
            speedX = -speedX;
        }
        else if (positionX < 0) {
            speedX = -speedX;
        }

        if (positionY > BOARD_HEIGHT) {
            speedY = -speedY;
        }
        else if (positionY < 0) {
            speedY = -speedY;
        }
    }

}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE