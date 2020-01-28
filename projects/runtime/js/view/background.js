var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var trees = {
            trees1 : 'assets/backsprites/tree_main.png',
            trees2 : 'assets/backsprites/tree_mainL.png',
            trees3 : 'assets/backsprites/tree_bench.png',
            trees4 : 'assets/backsprites/tree_light.png',
            trees5 : 'assets/backsprites/tree_dead.png'
        }
        var treeCurr;
        var buildings =  [];
        var builds = {
            _0 : 'assets/Buildings/build_0.png',
            _1 : 'assets/Buildings/build_1.png',
            _2 : 'assets/Buildings/build_2.png',
            _3 : 'assets/Buildings/build_3.png',
            _4 : 'assets/Buildings/build_4.png'
        }
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'rgba(4, 8, 108, 1)');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('assets/moonsprites/fullmoon.png');
            moon.x = canvasWidth - 200;
            moon.y = 20;
            moon.scaleX = 0.2;
            moon.scaleY = 0.2;
            background.addChild(moon);
            //I'm really proud of this one.
            var stars = [];
            for (var sCount = 0; sCount <= 10; sCount++) {
                var randStar = Math.floor(Math.random() * 3);
                var starY = (Math.floor(Math.random() * groundY)) - 25;
                var starX = Math.floor(Math.random() * canvasWidth);
                if (randStar == 0) {
                    stars[sCount] = draw.bitmap('assets/moonsprites/star1.png');
                }
                if (randStar == 1) {
                    stars[sCount] = draw.bitmap('assets/moonsprites/star2.png');
                }
                if (randStar == 2) {
                    stars[sCount] = draw.bitmap('assets/moonsprites/star3.png');
                }
                stars[sCount].x = canvasWidth - starX;
                stars[sCount].y = starY;
                stars[sCount].scaleX = 0.2;
                stars[sCount].scaleY = 0.2;
                background.addChild(stars[sCount]);
            }
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            //foregound vs. background, that's why.
            for (var i = 0; i <= 10; i++) {
                var randBuild = Math.floor(Math.random() * 5);
                if (randBuild == 0) {
                    buildings[i] = draw.bitmap(builds._0);
                }
                if (randBuild == 1) {
                    buildings[i] = draw.bitmap(builds._1);
                }
                if (randBuild == 2) {
                    buildings[i] = draw.bitmap(builds._2);
                }
                if (randBuild == 3) {
                    buildings[i] = draw.bitmap(builds._3);
                }
                if (randBuild == 4) {
                    buildings[i] = draw.bitmap(builds._4);
                }
            }
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = 160 * (i + 1);
                buildings[i].y = groundY - 288;
                buildings[i].scaleX = 0.5;
                buildings[i].scaleY = 0.45;
                background.addChild(buildings[i]);
            }
            
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap(trees.trees1);
            treeCurr = trees.trees1;
            tree.x = 500;
            tree.y = groundY - 256;
            tree.scaleX = 0.2;
            tree.scaleY = 0.2;
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            //tree.removeChild(tree);
            //tree = draw.bitmap(treeCurr);
            //background.addChild(tree);
            tree.x -= 1;
            if(tree.x < -256) {
                //this took a good while...
                treeRandom();
                tree.x = canvasWidth;
                
            }
            
            // TODO 5: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++) {
                buildings[i].x -= 0.5;
                
                if (buildings[i].x < -160) {
                    buildRandom(i);
                    buildings[i].x = canvasWidth + 160;
                }
            }

        } // end of update function - DO NOT DELETE
        
        function treeRandom() {
            var randTree = Math.floor(Math.random() * 5);
                if (randTree == 0) {
                    background.removeChild(tree);
                    tree = draw.bitmap(trees.trees1);
                    treeCurr = trees.trees1;
                    tree.x = canvasWidth;
                    tree.y = groundY - 256;
                    tree.scaleX = 0.2;
                    tree.scaleY = 0.2;
                    background.addChild(tree);
                }
                else if (randTree == 1) {
                    background.removeChild(tree);
                    tree = draw.bitmap(trees.trees2);
                    treeCurr = trees.trees2;
                    tree.x = canvasWidth;
                    tree.y = groundY - 256;
                    tree.scaleX = 0.2;
                    tree.scaleY = 0.2;
                    background.addChild(tree);
                }
                else if (randTree == 2) {
                    background.removeChild(tree);
                    tree = draw.bitmap(trees.trees3);
                    treeCurr = trees.trees3;
                    tree.x = canvasWidth;
                    tree.y = groundY - 256;
                    tree.scaleX = 0.2;
                    tree.scaleY = 0.2;
                    background.addChild(tree);
                }
                else if (randTree == 3) {
                    background.removeChild(tree);
                    tree = draw.bitmap(trees.trees4);
                    treeCurr = trees.trees4;
                    tree.x = canvasWidth;
                    tree.y = groundY - 256;
                    tree.scaleX = 0.2;
                    tree.scaleY = 0.2;
                    background.addChild(tree);
                }
                else if (randTree == 4) {
                    background.removeChild(tree);
                    tree = draw.bitmap(trees.trees5);
                    treeCurr = trees.trees5;
                    tree.x = canvasWidth;
                    tree.y = groundY - 256;
                    tree.scaleX = 0.2;
                    tree.scaleY = 0.2;
                    background.addChild(tree);
                }
            return tree;
        }
        
        function buildRandom(buildIndex) {
            var randBuild = Math.floor(Math.random() * 5);
                if (randBuild == 0) {
                    background.removeChild(buildings[buildIndex]);
                    buildings[buildIndex] = draw.bitmap(builds._0);
                    buildings[buildIndex].x = canvasWidth;
                    buildings[buildIndex].y = groundY - 288;
                    buildings[buildIndex].scaleX = 0.5;
                    buildings[buildIndex].scaleY = 0.45;
                    background.addChild(buildings[buildIndex]);
                }
                else if (randBuild == 1) {
                    background.removeChild(buildings[buildIndex]);
                    buildings[buildIndex] = draw.bitmap(builds._1);
                    buildings[buildIndex].x = canvasWidth;
                    buildings[buildIndex].y = groundY - 288;
                    buildings[buildIndex].scaleX = 0.5;
                    buildings[buildIndex].scaleY = 0.45;
                    background.addChild(buildings[buildIndex]);
                }
                else if (randBuild == 2) {
                    background.removeChild(buildings[buildIndex]);
                    buildings[buildIndex] = draw.bitmap(builds._2);
                    buildings[buildIndex].x = canvasWidth;
                    buildings[buildIndex].y = groundY - 288;
                    buildings[buildIndex].scaleX = 0.5;
                    buildings[buildIndex].scaleY = 0.45;
                    background.addChild(buildings[buildIndex]);
                }
                else if (randBuild == 3) {
                    background.removeChild(buildings[buildIndex]);
                    buildings[buildIndex] = draw.bitmap(builds._3);
                    buildings[buildIndex].x = canvasWidth;
                    buildings[buildIndex].y = groundY - 288;
                    buildings[buildIndex].scaleX = 0.5;
                    buildings[buildIndex].scaleY = 0.45;
                    background.addChild(buildings[buildIndex]);
                }
                else if (randBuild == 4) {
                    background.removeChild(buildings[buildIndex]);
                    buildings[buildIndex] = draw.bitmap(builds._4);
                    buildings[buildIndex].x = canvasWidth;
                    buildings[buildIndex].y = groundY - 288;
                    buildings[buildIndex].scaleX = 0.5;
                    buildings[buildIndex].scaleY = 0.45;
                    background.addChild(buildings[buildIndex]);
                }
            return buildings[buildIndex];
        }
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
