var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                //level 1
                { "type": "sawblade", "x": 400, "y": 275 },
                { "type": "sawblade", "x": 600, "y": 275 },
                { "type": "sawblade", "x": 3050, "y": 275 },
                { "type": "sawblade", "x": 1900, "y": 275 },
                { "type": "spikes", "x": 1050},
                { "type": "spikes", "x": 1650},
                { "type": "spikes", "x": 2550},
                { "type": "reward", "x": 3000},
                { "type": "sawblade", "x": 3750, "y": 275 },
                { "type": "sawblade", "x": 3850, "y": 275 },
                { "type": "enmy1", "x": 4000, "y": 90},
                { "type": "spikes", "x": 4250},
                { "type": "reward", "x": 4650},
                
                //level 2 (feaux mario 1-1)
                { "type": "sawblade", "x": 5500, "y": 275, "level": 2},
                { "type": "enmy2", "x": 5600, "y": 70, "level": 2},
                { "type": "sawblade", "x": 5650, "y": 275, "level": 2},
                { "type": "sawblade", "x": 5700, "y": 275, "level": 2},
                { "type": "reward", "x": 5750, "level": 2},
                { "type": "sawblade", "x": 5800, "y": 275, "level": 2},
                { "type": "sawblade", "x": 5850, "y": 275, "level": 2},
                { "type": "spikes", "x": 6000, "level": 2},
                { "type": "enmy2", "x": 6200, "y": 70, "level": 2},
                { "type": "spikes", "x": 6300, "level": 2},
                { "type": "enmy2", "x": 6700, "y": 70, "level": 2},
                { "type": "enmy2", "x": 6750, "y": 70, "level": 2},
                { "type": "spikes", "x": 6850, "level": 2},
                { "type": "enmy2", "x": 7250, "y": 70, "level": 2},
                { "type": "enmy2", "x": 7300, "y": 70, "level": 2},
                { "type": "spikes", "x": 7500, "level": 2},
                { "type": "reward", "x": 7850, "level": 2},
                { "type": "sawblade", "x": 8250, "y": 275, "level": 2},
                { "type": "sawblade", "x": 8300, "y": 275, "level": 2},
                { "type": "reward", "x": 8350, "level": 2},
                { "type": "sawblade", "x": 8350, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8400, "y": 75, "level": 2},
                { "type": "enmy2", "x": 8400, "y": 25, "level": 2},
                { "type": "enmy2", "x": 8450, "y": 25, "level": 2},
                { "type": "sawblade", "x": 8450, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8500, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8550, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8600, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8650, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8700, "y": 75, "level": 2},
                { "type": "sawblade", "x": 8700, "y": 275, "level": 2},
                { "type": "reward", "x": 8750, "level": 2},
                { "type": "sawblade", "x": 9350, "y": 275, "level": 2},
                { "type": "sawblade", "x": 9450, "y": 275, "level": 2},
                { "type": "sawblade", "x": 9450, "y": 75, "level": 2},
                { "type": "enmy2", "x": 9450, "y": 70, "level": 2},
                { "type": "enmy3", "x": 9500, "y": 70, "level": 2},
                { "type": "sawblade", "x": 9550, "y": 275, "level": 2},
                { "type": "spikes", "x": 10050, "level": 2},
                { "type": "enmy2", "x": 10500, "y": 70, "level": 2},
                { "type": "enmy2", "x": 10550, "y": 70, "level": 2},
                { "type": "reward", "x": 11000, "level": 2}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
            var key, value;
            for (key = 0; key <= levelData.gameItems.length-1; key++) {
                var currItem = levelData.gameItems[key];
                
              if (currItem.level === 2) {
                  if (currItem.type === 'sawblade') {
                    createSawBlade(currItem.x, currItem.y);
                  }
                  if (currItem.type === 'spikes') {
                      createSpikes(currItem.x, groundY - 25);
                  }
                  if (currItem.type === 'enmy2') {
                      createEnemy1(currItem.x, currItem.y);
                  }
                  if (currItem.type === 'enmy3') {
                      createEnemy1(currItem.x, currItem.y);
                  }
                  if (currItem.type === 'reward') {
                      createReward(currItem.x, 275);
                  }
              }
              else {
                  if (currItem.type === 'sawblade') {
                    createSawBlade(currItem.x, currItem.y);
                  }
                  if (currItem.type === 'spikes') {
                      createSpikes(currItem.x, groundY - 25);
                  }
                  if (currItem.type === 'enmy1') {
                      createEnemy1(currItem.x, currItem.y);
                  }
                  if (currItem.type === 'reward') {
                      createReward(currItem.x, groundY - 130);
                  }
              }
              
            }
            function createSawBlade(x, y) {
                var hitZoneSize = 20;
                var damageFromObstacle = 10;
                var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                sawBladeHitZone.x = x;
                sawBladeHitZone.y = y;
                game.addGameItem(sawBladeHitZone);
                var obstacleImage = draw.bitmap('img/sawblade.png');
                sawBladeHitZone.addChild(obstacleImage);
                obstacleImage.x = -25;
                obstacleImage.y = -25;
            }
            function createSpikes(x, y) {
                var hitZoneSize = 25;
                var damageFromObstacle = 10;
                var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                spikeHitZone.x = x;
                spikeHitZone.y = y;
                game.addGameItem(spikeHitZone);
                var obstacleImage = draw.bitmap('assets/spikes.png');
                spikeHitZone.addChild(obstacleImage);
                obstacleImage.x = -50;
                obstacleImage.y = -75;
                obstacleImage.scaleX = 0.2;
                obstacleImage.scaleY = 0.2;
            }
            
            function createEnemy1(x, y) {
                var enemy =  game.createGameItem('enemy',50);
                var hammer = draw.bitmap('assets/hammer.png');
                hammer.x = 0;
                hammer.y = 0;
                hammer.scaleX = 0.2;
                hammer.scaleY = 0.2;
                enemy.rotationalVelocity = -10;
                enemy.addChild(hammer);
                enemy.x = x;
                enemy.y = groundY - y;
                game.addGameItem(enemy);
                enemy.velocityX = -2;
                enemy.onPlayerCollision = function () {
                    game.changeIntegrity(-30);
                    enemy.fadeOut(1000);
                    enemyOver.fadeOut(1000);
                }
                enemy.onProjectileCollision = function() {
                    game.increaseScore(100);
                    enemy.shrink();
                    enemyOver.shrink();
                }
                var enemyOver =  game.createGameItem('enemy',50);
                var gnome = draw.bitmap('assets/gnome.png');
                gnome.x = 10;
                gnome.y = -50;
                gnome.scaleX = 0.2;
                gnome.scaleY = 0.2;
                enemyOver.addChild(gnome);
                enemyOver.x = x;
                enemyOver.y = groundY - y;
                game.addGameItem(enemyOver);
                enemyOver.velocityX = -2;
            }
            function createReward(x, y) {
                var reward = game.createGameItem('reward', 10);
                var coin = draw.bitmap('assets/coin.png');
                coin.x = -32;
                coin.y = -32;
                coin.scaleX = 0.1;
                coin.scaleY = 0.1;
                reward.addChild(coin);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -2;
                reward.onPlayerCollision = function() {
                    game.increaseScore(500);
                    reward.fadeOut();
                }
            }
        
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
