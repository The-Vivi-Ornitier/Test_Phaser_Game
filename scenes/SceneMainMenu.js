import eventsCenter from "../EventsCenter.js";

export default class SceneMainMenu extends Phaser.Scene {

    constructor() {
        super("SceneMainMenu");
        this.unlockedUpgrades = new Array();
    }

    init() {
    };

    preload(){
        this.load.image('menu', 'assets/Main_Menu.png');
        this.load.image('button', 'assets/button.png');
    }

    create(){


        //load
        var file = JSON.parse(localStorage.getItem('save'));
        if(file !== null){
            if(file.unlockedUpgrades !== 'undefined'){
                this.unlockedUpgrades = file.unlockedUpgrades;
            }
        }
        //Game.scene.score = file.score;
        //Game.scene.visits = file.visits;

        
	const { width, height } = this.scale

    this.add.image(width*0.5, height*0.5, 'menu');

	// Play button
	this.playButton = this.add.image(width * 0.5, height * 0.6, 'button')
		.setDisplaySize(150, 50);
	
	this.add.text(this.playButton.x, this.playButton.y, 'Play')
		.setOrigin(0.5);

        this.playButton.setInteractive({ useHandCursor: true });
        this.playButton.on('pointerdown', () => this.startGame());
    }
    
    startGame(){
        this.scene.launch('SceneMain');
        this.scene.stop();
    }
}