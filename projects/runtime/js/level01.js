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
                { "type": "sawblade", "x": 400, "y": 275 },
                { "type": "sawblade", "x": 600, "y": 275 },
                { "type": "sawblade", "x": 3050, "y": 275 },
                { "type": "sawblade", "x": 1900, "y": 275 },
                { "type": "spikes", "x": 1050},
                { "type": "spikes", "x": 1650},
                { "type": "spikes", "x": 2550},
                { "type": "reward", "x": 3000},
                { "type": "enmy1", "x": 400, "y": 20}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
            var key, value;
            for (key = 0; key <= levelData.gameItems.length-1; key++) {
                var currItem = levelData.gameItems[key];
                
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
                  createReward(currItem.x, groundY - 300);
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
                enemy.velocityX = -1;
                enemy.onPlayerCollision = function () {
                    game.changeIntegrity(-30);
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
                enemyOver.velocityX = -1;
            }
            function createReward(x, y) {
                var reward = game.createGameItem('reward', 10);
                var coin = draw.bitmap('assets/coin.png');
                coin.x = -25;
                coin.y = -25;
                coin.scaleX = 0.05;
                coin.scaleY = 0.05;
                reward.addChild(coin);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.onPlayerCollision = function() {
                    game.increaseScore(500);
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
