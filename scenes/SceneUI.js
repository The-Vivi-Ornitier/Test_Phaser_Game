import eventsCenter from "../EventsCenter.js";

export default class SceneUI extends Phaser.Scene {

    constructor() {
        super("SceneUI");
    }

    init() {
        // game variables
        this.xpCount = 0;
        this.xpText = this.add.text(16, 16, 'XP: 0', { fontSize: '32px', fill: '#FFF' });//.setScrollFactor(0);
        
    };

    create(){
        

        eventsCenter.on('xpCollect', this.updateXP, this);
        eventsCenter.on('upgradeComplete', this.resetXP, this);
    }

    updateXP(xpCount){
        this.xpText.setText('XP: ' + xpCount);
    }
    resetXP(){
        this.xpText.setText('XP: 0');
    }
}