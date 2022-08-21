import eventsCenter from "../EventsCenter.js";

export default class ScenePause extends Phaser.Scene {

    constructor() {
        super("ScenePause");
    }

    init() {
    };

    create(){

        
        this.backText = this.add.text(840,525, 'Resume');
        this.backText.setInteractive({ useHandCursor: true });
        this.backText.on('pointerdown', () => this.resumeButton());
    }
    resumeButton(){
        eventsCenter.emit('resumeGame');
        this.scene.stop();
    }
}