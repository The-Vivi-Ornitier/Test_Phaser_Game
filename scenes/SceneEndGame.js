import eventsCenter from "../EventsCenter.js";

export default class SceneEndGame extends Phaser.Scene {

    constructor() {
        super("SceneEndGame");
        this.unlockedUpgrades = new Array();
        eventsCenter.on('updateUpgradeSaveArray', this.updateUpgrades, this);
    }

    init() {
    };

    preload(){
        this.load.image('dead', 'assets/Main_Menu_Dead.png');
        this.load.image('button', 'assets/button.png');
    }

    create(){

    //var mainScene = this.scene.get('sceneMain');
    //mainScene.stop();
    //mainScene.player.destroy();
        
	const { width, height } = this.scale

    this.add.image(width*0.5, height*0.5, 'dead');

	// Play button
	this.playButton = this.add.image(width * 0.5, height * 0.6, 'button')
		.setDisplaySize(150, 50);
	
	this.add.text(this.playButton.x, this.playButton.y, 'Return to Menu')
		.setOrigin(0.5);

        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', () => this.returnToMenu());
    }
    
    returnToMenu(){

        //save
            var file = {
                unlockedUpgrades: this.unlockedUpgrades
            };
            localStorage.setItem('save',JSON.stringify(file));
        
            //load
            //var file = JSON.parse(localStorage.getItem('save'));
            //Game.scene.score = file.score;
            //Game.scene.visits = file.visits;

        this.scene.launch('SceneMainMenu');
        this.scene.stop();
    }

    updateUpgrades(upgradeArray){
        this.unlockedUpgrades = upgradeArray;
    }
}