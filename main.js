//imports
import SceneMain from "./scenes/SceneMain.js";
import ScenePause from "./scenes/ScenePause.js";


//load scenes
var sceneMain = new SceneMain();
var scenePause = new ScenePause();


var config = {
    type: Phaser.AUTO,
    width: 1680,
    height: 1050,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    //scene: [sceneMain, scenePause]
    /*scene: {
        preload: preload,
        create: create,
        update: update
    }*/
};

var game = new Phaser.Game(config);


//add main scene to game
game.scene.add('SceneMain', sceneMain);
game.scene.add('ScenePause', scenePause);

game.scene.start('SceneMain');