//imports
import SceneMain from "./scenes/SceneMain.js";
import SceneUpgrade from "./scenes/SceneUpgrade.js";
import SceneUI from "./scenes/SceneUI.js";
import ScenePause from "./scenes/ScenePause.js";

import eventsCenter from './EventsCenter.js';
import SceneMainMenu from "./scenes/SceneMainMenu.js";
import SceneEndGame from "./scenes/SceneEndGame.js";


//load scenes
var sceneMain = new SceneMain();
var scenePause = new ScenePause();
var sceneUpgrade = new SceneUpgrade();
var sceneUI = new SceneUI();
var sceneMainMenu = new SceneMainMenu();
var sceneEndGame = new SceneEndGame()


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
};

var game = new Phaser.Game(config);


//add main scenes to game
game.scene.add('SceneMainMenu', sceneMainMenu);
game.scene.add('SceneMain', sceneMain);
game.scene.add('SceneUpgrade', sceneUpgrade);
game.scene.add('SceneUI', sceneUI);
game.scene.add('ScenePause', scenePause);
game.scene.add('SceneEndGame', sceneEndGame);
game.scene.start('SceneMainMenu');
//game.scene.start('SceneMain');