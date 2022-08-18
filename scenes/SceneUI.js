import eventsCenter from "../EventsCenter.js";

export default class SceneUI extends Phaser.Scene {

    constructor() {
        super("SceneUI");
    }

    init() {
        // game variables
        this.xpCount = 0;
        this.xpText = this.add.text(16, 16, 'XP: 0', { fontSize: '32px', fill: '#FFF' });//.setScrollFactor(0);
        this.backText = this.add.text(840,525, 'Resume');
        
    };

    create(){
        

        eventsCenter.on('xpCollect', this.updateXP, this);
        eventsCenter.on('upgradeComplete', this.resetXP, this);
        eventsCenter.on('pauseGame', this.pauseGame, this);

        
        
        this.backText.setVisible(false);
        this.backText.on('pointerdown', () => this.resumeButton());
    }

    updateXP(xpCount){
        this.xpText.setText('XP: ' + xpCount);
    }
    resetXP(){
        this.xpText.setText('XP: 0');
    }
    pauseGame(){
        this.backText.setVisible(true);
        this.backText.setInteractive({ useHandCursor: true });
    }
    resumeButton(){
        this.backText.visible = false;
        this.backText.setInteractive(false);
        eventsCenter.emit('resumeGame');
    }
}