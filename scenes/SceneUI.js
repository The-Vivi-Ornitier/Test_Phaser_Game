import eventsCenter from "../EventsCenter.js";

export default class SceneUI extends Phaser.Scene {

    constructor() {
        super("SceneUI");
        eventsCenter.on('xpCollect', this.updateXP, this);
        eventsCenter.on('upgradeComplete', this.resetXP, this);
        eventsCenter.on('playerHealthUpdate', this.updateHealth, this);
    }

    init() {
        // reset/init game variables
        this.xpCount = 0;
        this.xpText = this.add.text(16, 16, 'XP: 0', { fontSize: '32px', fill: '#FFF' });//.setScrollFactor(0);
        this.playerHealth = 3;
        this.healthText = this.add.text(1000, 16, 'HP: 3', { fontSize: '32px', fill: '#FFF' });
    };

    create(){
        

        
    }

    updateXP(xpCount){
        this.xpText.setText('XP: ' + xpCount);
    }
    resetXP(){
        this.xpText.setText('XP: 0');
    }

    updateHealth(healthChange){
        this.playerHealth += healthChange;
        this.healthText.setText('HP: ' + this.playerHealth);

        if(this.playerHealth <= 0){
            eventsCenter.emit('playerDeath');
        }
    }
}