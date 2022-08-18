import eventsCenter from "../EventsCenter.js";

export default class SceneUpgrade extends Phaser.Scene {

    constructor() {
        super("SceneUpgrade");
    }

    init(){
        this.backText = this.add.text(840,525, 'UPGRADE GET');
    }

    create() {
        this.scene.setVisible(false);
        eventsCenter.on('upgradeGet', this.upgradeGet, this);
        //this.backText.setInteractive({ useHandCursor: true });
        this.backText.on('pointerdown', () => this.resumeButton());
    }
 
    resumeButton() {
         //this.scene.resume('SceneMain');
         //this.scene.remove('ScenePause');
         this.scene.setVisible(false);
         this.backText.disableInteractive();
         //this.backText.setInteractive({ useHandCursor: false });
         eventsCenter.emit('upgradeComplete');
         //this.scene.run('SceneMain');
    }

    upgradeGet(){
        //backText.setColor(0x000);
        this.scene.setVisible(true);
        this.scene.bringToTop('SceneUpgrade');
        this.backText.setInteractive({ useHandCursor: true });
        //this.scene.setInteractive();
    }

}