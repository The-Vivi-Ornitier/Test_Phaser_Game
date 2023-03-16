import eventsCenter from "../EventsCenter.js";

export default class SceneMainMenu extends Phaser.Scene {

    constructor() {
        super("SceneMainMenu");
    }

    init() {
    };

    preload(){
        this.load.image('menu', 'assets/Main_Menu.png');
        this.load.image('button', 'assets/button.png');
    }

    create(){


        
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