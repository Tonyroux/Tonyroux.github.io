var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;
        var circles = [];
        var borderRandom = 1
        var mouseX = 0;
        var mouseY = 0;
        var maxCircles = 100;
        var recentIntercept = false;

        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            borderRandom = Math.floor(Math.random() * 5)
            circle = draw.randomCircleInArea(canvas, true, true, '#999', borderRandom);
            //randomCircleInArea(area, randomizeAlpha, addCross, borderColor, borderThickness, randomRadialProps)  <- parameters
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var circleCount = 0; circleCount < maxCircles; circleCount++) {
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            /*physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);
            
            // TODO 5 : Call game.checkCirclePosition() on your circles.
            game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]);*/

            // TODO 8 : Iterate over the array
            for (var circleNum = 0; circleNum < maxCircles; circleNum++) {
                 physikz.updatePosition(circles[circleNum]);
                 game.checkCirclePosition(circles[circleNum]);
            }
            
            //Mouse position check
            $("#canvas").mousemove(function(event) {
                mouseX = event.pageX;
                mouseY = event.pageY;
            })
            //console.log("x: " + mouseX + ", y: " + mouseY);
            //debugging
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {
            
            
            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 5 : YOUR CODE STARTS HERE //////////////////////
            if (circle.x < 0) {
                circle.x = canvas.width;
            }
            
            if (circle.y > canvas.height) {
                circle.y = 0;
            }
            
            if (circle.y < 0) {
                circle.y = canvas.height;
            }
            
            //Mouse rebound!!
            if (circle.x + 15 >= mouseX && circle.x - 15 <= mouseX){
                if (circle.x + 5 <= mouseX || circle.x - 5 >= mouseX) {
                    recentIntercept = true;
                    setInterval(function(){recentIntercept = false;}, 2000);
                    if(circle.y + 15 >= mouseY && circle.y - 15 <= mouseY){
                        if (circle.y + 5 <= mouseY || circle.y - 5 >= mouseY) {
                            console.log("intercept circle");
                            physikz.addRandomVelocity(circle, canvas, 2, 2);
                        }
                    }
                }
            }


            // YOUR TODO 5 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
